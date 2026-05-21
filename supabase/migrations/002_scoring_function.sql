-- Aperture scoring function.
-- Run after 001_methodology_layer.sql has completed successfully.

create or replace function public.compute_assessment_scores(p_assessment_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $function$
begin
  insert into public.assessment_scores (assessment_id, practice_area_id, score, gap_band)
  with scored as (
    select
      q.practice_area_id,
      round(
        sum(
          (
            case
              when q.is_inverted then 100 - normalised.normalised_value
              else normalised.normalised_value
            end
          ) * q.weight
        ) / nullif(sum(q.weight), 0)
      )::int as score
    from public.answers a
    join public.questions q on q.id = a.question_id
    cross join lateral (
      select
        case
          when q.format = 'yes_no' and lower(a.raw_response) = 'yes' then 100
          when q.format = 'yes_no' and lower(a.raw_response) = 'no' then 0
          when q.format = 'rating_1_5' then greatest(0, least(100, (a.answer_value - 1) * 25))
          else greatest(0, least(100, a.answer_value))
        end as normalised_value
    ) normalised
    where a.assessment_id = p_assessment_id
    group by q.practice_area_id
  )
  select
    p_assessment_id,
    scored.practice_area_id,
    scored.score,
    case
      when scored.score <= 25 then 'critical'
      when scored.score <= 50 then 'vulnerable'
      when scored.score <= 75 then 'capable'
      else 'strong'
    end as gap_band
  from scored
  on conflict (assessment_id, practice_area_id) do update
  set
    score = excluded.score,
    gap_band = excluded.gap_band,
    updated_at = now();
end;
$function$;

grant execute on function public.compute_assessment_scores(uuid) to anon, authenticated;
