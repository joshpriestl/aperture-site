-- Seed findings_library with all 140 findings across 10 practice areas.
-- Ported verbatim from aperturev1.lovable.app findings library.
-- Trigger question UUIDs mapped from Lovable IDs to this project's question UUIDs
-- by matching question text and practice area. Source of truth: APERTURE OS > AUDIT_SPEC > Findings Library.

insert into public.findings_library (id, practice_area_id, trigger_question_id, trigger_condition, gap_band, severity, finding_text) values

-- ============================================================
-- STRATEGY (5c9ac703-af9c-4109-b19f-13ad4f13f377)
-- Q1 0c85ab9f: shared direction (yes_no)
-- Q2 a0f55d50: priorities quarterly (yes_no)
-- Q3 163daff4: ideal customer / decline (yes_no)
-- Q4 fdd90dca: filter for what to say no to (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'capable', 'low', 'Strategy is mostly in place and mostly followed. Tightening the quarterly review rhythm would close the last gap between intent and execution.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'capable', 'low', 'The filter for what to decline could be sharper. A one page version your team can reference would prevent the slow drift that has historically crept in.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'critical', 'high', 'There is no shared answer to where the business is going. Without that, every decision is contested and nothing compounds. This is the most expensive gap in the business right now.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'critical', 'high', 'Priorities change week to week based on who shouted loudest. The team is busy but the business is not moving in any deliberate direction.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'critical', 'medium', 'You are saying yes to work that is wrong for you because there is no written filter for what to decline. Each wrong-fit client is consuming capacity the right ones could fund.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'critical', 'medium', 'No one outside your head can describe the strategy in a sentence. That means no one outside your head is helping you execute it.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'vulnerable', 'medium', 'Strategy exists but is not reviewed on a cadence. Plans drift, the team improvises, and quarters end without a clean read on what worked.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'vulnerable', 'medium', 'The link between annual goals and weekly work is loose. People are busy on things that look productive but do not move the strategic needle.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'vulnerable', 'medium', 'Decisions to take on new work happen case by case rather than against a written filter. Over time this dilutes positioning and clogs delivery.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', null, null, 'vulnerable', 'medium', 'There is a plan but it does not survive contact with a hard week. The first sign of pressure and the team reverts to reacting to whatever lands in the inbox.'),
-- question-tied findings
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', '0c85ab9f-6333-48b3-a95d-b60a86c2adbd', 'failed_yes_no', null, 'high', 'Your team is operating without a shared direction. Different people are pulling toward different versions of the future, which means effort compounds inefficiently and decisions get re-litigated.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', 'a0f55d50-12d9-4ca3-9c6c-818e85cabc77', 'failed_yes_no', null, 'high', 'Without written priorities reviewed quarterly, the business defaults to whatever is loudest this week. Strategy without cadence is just opinion.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', '163daff4-9593-47c3-9965-3c1c0072e88e', 'failed_yes_no', null, 'medium', 'You are likely saying yes to clients you should be declining, which costs more than the revenue they bring. Defining who you do not serve is the discipline that protects margin.'),
(gen_random_uuid(), '5c9ac703-af9c-4109-b19f-13ad4f13f377', 'fdd90dca-063b-43aa-babf-a22c15801573', 'low_rating', null, 'medium', 'Your team does not have a clear filter for what to decline. This produces scope creep, distracted execution and dilution of what you are best at.'),

-- ============================================================
-- REVENUE AND PIPELINE (d468f278-79c0-4178-8d74-1ebc88f11b43)
-- Q1 e3272e7f: pipeline visibility (yes_no)
-- Q2 9f2ca28c: defined sales process (yes_no)
-- Q3 300338e5: where you lose prospects (yes_no)
-- Q4 a62779d0: follow-up confidence (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'capable', 'low', 'Pipeline hygiene is good but could be tighter. A weekly 20 minute review of stage movement would catch the small leaks before they compound.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'capable', 'low', 'Conversion data is captured but rarely acted on. The next win is in using it to coach the team rather than just report on it.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'critical', 'high', 'You cannot say with confidence what is in pipeline this week. Forecasting is guesswork, hiring is guesswork, and cash decisions are made on hope.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'critical', 'high', 'Deals are being lost between stages because no one owns the handoff. Qualified interest is decaying into nothing and you have no visibility into where.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'critical', 'medium', 'The sales process lives in individual heads. When someone leaves or gets ill, the pipeline they were running goes dark with them.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'critical', 'medium', 'Follow-up is inconsistent. The cheapest revenue you will ever have access to is the leads you have already paid to acquire, and most of it is leaking.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'vulnerable', 'medium', 'Pipeline is tracked but not trusted. The numbers in the CRM and the numbers in the founder''s head do not match, so neither gets used to make decisions.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'vulnerable', 'medium', 'Conversion is not measured stage by stage. You know the top of funnel and you know revenue, but the bit in the middle is a black box.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'vulnerable', 'medium', 'Sales activity is happening but not against targets. The team is busy without a clear read on whether they are on pace.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', null, null, 'vulnerable', 'medium', 'Lead qualification varies by who picks up the call. The same prospect can be in pipeline or rejected depending on the day.'),
-- question-tied findings
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', 'e3272e7f-66e3-476f-a305-a9da417a7982', 'failed_yes_no', null, 'high', 'You cannot answer the most basic commercial question about your business in real time. Decisions are being made on instinct rather than instrumented data.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', '9f2ca28c-6be7-45a8-acc9-b699aa951c6f', 'failed_yes_no', null, 'high', 'Your sales process exists in the heads of individuals. When one of them leaves, the process leaves with them. Revenue is single-point-of-failure dependent.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', 'a62779d0-298e-4148-9ebe-874703c16911', 'low_rating', null, 'high', 'Qualified leads are going dark without follow-up. This is the cheapest revenue you will ever have access to and you are giving it back to your competitors.'),
(gen_random_uuid(), 'd468f278-79c0-4178-8d74-1ebc88f11b43', '300338e5-2713-43ae-b02c-f7612c0868d2', 'failed_yes_no', null, 'medium', 'You can see leads in and revenue out but not where deals are stalling. The biggest leverage point in any pipeline is the worst-converting stage and you cannot see yours.'),

-- ============================================================
-- MARKETING (a0195e0e-a0bb-4c67-9f43-25b4d34418cb)
-- Q1 3ea5c5d3: cost per lead by channel (yes_no)
-- Q2 851fbee4: marketing tied to annual plan (yes_no)
-- Q3 c1d878cd: staying in front of not-ready prospects (yes_no)
-- Q4 bfbe4742: speaks to specific segments (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'capable', 'low', 'Marketing is performing but could be sharper. A quarterly review of message-market fit would prevent the slow drift that historically sets in.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'capable', 'low', 'Distribution is solid but underleveraged. Each piece of content could work harder across more surfaces with minimal additional effort.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'critical', 'high', 'You are spending on marketing without knowing what is working. The budget is being allocated on instinct and the wrong half keeps getting funded.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'critical', 'high', 'There is no plan. Marketing happens when someone has time, which means it produces noise rather than compounding pipeline.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'critical', 'medium', 'Your positioning speaks to everyone, which means it lands with no one. Prospects cannot tell what you do or who you do it for.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'critical', 'medium', 'The 80 percent of prospects not ready today are being abandoned. There is no nurture and no follow-up, so the work that brought them in is wasted.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'vulnerable', 'medium', 'Marketing activity is steady but the throughline is missing. Campaigns happen but do not build on each other, so each one starts cold.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'vulnerable', 'medium', 'You can describe what you do but not why a buyer should care. The message is accurate and forgettable, which is the worst combination.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'vulnerable', 'medium', 'Attribution is partial. You can see some channels working but not the picture as a whole, which makes reallocating budget a guess.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', null, null, 'vulnerable', 'medium', 'Content is being produced but not distributed. The best work the team is making is being seen by a fraction of the audience that should see it.'),
-- question-tied findings
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', '3ea5c5d3-2ccd-41a6-9e7e-57b26a432f96', 'failed_yes_no', null, 'high', 'You are spending on marketing without knowing which channels are working. Budget is being allocated by inertia rather than evidence.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', 'c1d878cd-cbcb-435a-ac4a-ad69c3810cde', 'failed_yes_no', null, 'high', 'The 80 percent of prospects who are not ready to buy today are being lost. There is no asset working in the background to bring them back when they are ready.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', '851fbee4-395b-481f-bb7f-209d89a2ffa7', 'failed_yes_no', null, 'medium', 'Marketing is reactive rather than planned, which means it is producing tactical output instead of compounding brand and pipeline assets.'),
(gen_random_uuid(), 'a0195e0e-a0bb-4c67-9f43-25b4d34418cb', 'bfbe4742-1b41-4060-807e-374a9f3a76d6', 'low_rating', null, 'medium', 'Your marketing speaks to everyone, which means it speaks to no one. Generic messaging converts at a fraction of segment-specific messaging.'),

-- ============================================================
-- BRAND AND COMMUNICATIONS (4a892784-84cd-4547-9e52-d5ccb895d904)
-- Q1 04d85cf6: documented brand guidelines (yes_no)
-- Q2 e3a1582e: consistent voice across content (yes_no)
-- Q3 0ed8a0e7: positioning statement tested (yes_no)
-- Q4 2f12117b: articulate differentiation (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'capable', 'low', 'Brand is consistent enough. The next gain is in sharpening the few high-leverage surfaces, the homepage hero, the first proposal page, the founder bio.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'capable', 'low', 'Messaging is on point and could be tested more aggressively. Small variations on the highest traffic pages would surface what is actually doing the work.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'critical', 'high', 'Your positioning has not been tested against the buyers you want. You are guessing at what resonates and the market is telling you, in silence, that you have guessed wrong.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'critical', 'medium', 'The brand is whatever the last person to touch it decided. There is no written reference, so every prospect experiences a slightly different company.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'critical', 'medium', 'No one on the team can crisply say why you are different. If they cannot, the market will not work it out either.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'critical', 'medium', 'Visual and verbal identity drift across surfaces. The website, the deck and the proposal look like three different companies, which costs you trust before the sales conversation starts.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'vulnerable', 'medium', 'Brand exists in fragments. There are guidelines but they are not enforced, so the work coming out is on-brand only by accident.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'vulnerable', 'medium', 'Your messaging is functional but not memorable. Buyers can describe what you do and not why it matters, which puts every deal on price.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'vulnerable', 'medium', 'The story you tell internally and the story you tell externally are not aligned. Team members hesitate when describing the company because they are not sure which version to use.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', null, null, 'vulnerable', 'medium', 'Customer language is not feeding back into messaging. The exact phrases that win deals are not making it into the website or the deck.'),
-- question-tied findings
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', '0ed8a0e7-9e21-4605-9d4a-783c2bc44113', 'failed_yes_no', null, 'high', 'Your positioning has not been tested against the people you are trying to win. You may be saying things that resonate internally and fall flat externally.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', '04d85cf6-bc3a-4d12-9450-1bdadb2e1c11', 'failed_yes_no', null, 'medium', 'Your brand is inconsistent because there is no written reference for what it is. Every piece of output is a guess at the standard.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', 'e3a1582e-a253-4bb8-8541-82c6530f53c1', 'failed_yes_no', null, 'medium', 'Customers experience a different company depending on who in your team they are talking to. Trust erodes when the voice is inconsistent.'),
(gen_random_uuid(), '4a892784-84cd-4547-9e52-d5ccb895d904', '2f12117b-f045-4b2a-826e-4fe99485d1a7', 'low_rating', null, 'medium', 'Your team cannot crisply articulate why you are different. If the team cannot say it, the market certainly cannot hear it.'),

-- ============================================================
-- OPERATIONS (68d7af8a-872c-473c-b6ec-ed8a71fef683)
-- Q1 e20809ae: documented processes (yes_no)
-- Q2 b7f7589e: measure capacity (yes_no)
-- Q3 1919f5b5: sales-to-delivery handoff (yes_no)
-- Q4 e2ab7ad7: operate without founder (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'capable', 'low', 'Operations are solid and could be more leveraged. The next gain is in turning informal best practice into written standard.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'capable', 'low', 'Documentation exists but is not maintained. A light quarterly review would prevent the slow rot that creeps in over a year.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'critical', 'high', 'The business cannot scale because it cannot be replicated. Every new hire releases capacity slowly because nothing is documented.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'critical', 'high', 'Quality drops whenever you step out of the room. The business runs on your attention rather than on systems, which caps how big it can get.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'critical', 'medium', 'Capacity is invisible. You cannot tell whether the team is at, under or over until something breaks, which makes hiring reactive and expensive.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'critical', 'medium', 'Work is being redone because handoffs are unclear. The same conversation is happening three times across delivery, which is a tax on every project.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'vulnerable', 'medium', 'Process exists but is inconsistently followed. New hires learn by osmosis, which means each one is slightly different from the last.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'vulnerable', 'medium', 'Some workflows are documented and most are not. The 20 percent that are documented are running well, which proves the model and exposes the gap.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'vulnerable', 'medium', 'Operational reviews are infrequent. Issues that should have been caught in week one are surfacing in month three, which is when they get expensive.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', null, null, 'vulnerable', 'medium', 'Project quality is good when conditions are good. The system has not been tested against pressure, and the cracks will appear at the worst time.'),
-- question-tied findings
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', 'e20809ae-fe42-4e6f-854f-34d94657d625', 'failed_yes_no', null, 'high', 'Your business cannot scale because it cannot be replicated. Every new hire relearns from scratch and every senior person is a single point of failure.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', '1919f5b5-d076-4385-8d06-9b450c21d7ce', 'failed_yes_no', null, 'high', 'Deals are won and then lose value at the seam between sales and delivery. The promise the customer bought is not the experience they get.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', 'e2ab7ad7-06cc-417f-b85b-de9196bdb632', 'low_rating', null, 'high', 'The business cannot operate at quality without you in the room. This is the constraint on everything: your time, your scale, your eventual exit value.'),
(gen_random_uuid(), '68d7af8a-872c-473c-b6ec-ed8a71fef683', 'b7f7589e-cb30-4425-ab21-e2cf8b67e0c9', 'failed_yes_no', null, 'medium', 'You cannot see whether you are at, under or over capacity, which means hiring and delivery decisions are being made blind.'),

-- ============================================================
-- AI AND AUTOMATION (ab5c041a-7dbb-4dd2-a474-a49652916883)
-- Q1 1351ba6f: identified top 3 workflows for AI (yes_no)
-- Q2 ff0986ec: automated workflows running today (yes_no)
-- Q3 e5a3940b: clear owner for AI adoption (yes_no)
-- Q4 52c9ce21: AI embedded in day-to-day (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'capable', 'low', 'AI is integrated and could be pushed further. The next gain is in identifying the two or three workflows where automation would unlock disproportionate time.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'capable', 'low', 'Standards exist but could be tighter. A short monthly review of what is working would compound the gains the team is already making.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'critical', 'high', 'AI is not part of how the business operates. The productivity differential between teams using it well and teams not using it at all is now too large to ignore.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'critical', 'high', 'Your team is spending hours on work that does not need a human. Every one of those hours is paid for twice, once in salary and once in the work that did not happen.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'critical', 'medium', 'There is no map of where AI would create the most leverage. Adoption is happening at the edges and the highest value applications are sitting unused.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'critical', 'medium', 'No one owns AI in the business. Without ownership, it stays as a personal productivity tool rather than becoming a competitive advantage.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'vulnerable', 'medium', 'AI is being used by some of the team some of the time. The benefits are real and uneven, which means the business is not capturing the full upside.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'vulnerable', 'medium', 'Tools have been adopted but workflows have not changed. People are using AI to do the old work faster rather than to rethink what the work is.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'vulnerable', 'medium', 'There is no shared standard for how to use AI safely. Sensitive information is being pasted into models without anyone owning the policy.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', null, null, 'vulnerable', 'medium', 'The pace of AI capability is faster than your review cycle. By the time you have a process, the underlying tool has moved.'),
-- question-tied findings
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', '1351ba6f-b3c5-4a7a-bd3d-b9cb4e8903c2', 'failed_yes_no', null, 'high', 'You have not identified where AI would create the most leverage in your business. Competitors are doing this work right now and the gap compounds monthly.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', 'ff0986ec-e30d-4384-8dac-68cc86823383', 'failed_yes_no', null, 'high', 'Your team is doing work that does not need a human. Every hour spent on this is an hour not spent on the work that does.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', '52c9ce21-ec23-4052-a9db-f0c2799952b0', 'low_rating', null, 'high', 'AI is not yet part of how your team operates. The productivity differential between AI-native teams and non-AI teams is now the single biggest commercial gap in most markets.'),
(gen_random_uuid(), 'ab5c041a-7dbb-4dd2-a474-a49652916883', 'e5a3940b-0292-4c69-b214-8c4b8c151d0c', 'failed_yes_no', null, 'medium', 'AI adoption has no owner, which means it has no accountability. It will not happen by accident.'),

-- ============================================================
-- DATA AND REPORTING (29d92313-f013-4a09-aa14-5edba23472c6)
-- Q1 35d87e8f: real-time metrics (yes_no)
-- Q2 79df082f: single set of numbers on cadence (yes_no)
-- Q3 5df9b99b: decisions based on documented data (yes_no)
-- Q4 cf63bd77: data accuracy confidence (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'capable', 'low', 'Reporting is in good shape. The next gain is in tightening the link between what is reported and what gets acted on the next day.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'capable', 'low', 'Dashboards exist and are slightly underused. A 20 minute weekly review with the team would convert visibility into momentum.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'critical', 'high', 'You cannot see your own business in real time. Every important decision waits on someone manually pulling numbers, which means decisions are made late or not at all.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'critical', 'high', 'The team does not trust the numbers. When data is questionable, decision-making defaults to whoever is loudest, and loud is not always right.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'critical', 'medium', 'There is no single dashboard the team reviews together. Different people are looking at different views of the truth, which guarantees disagreement.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'critical', 'medium', 'Material decisions are being made on instinct. Instinct is sometimes right and is not a strategy.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'vulnerable', 'medium', 'Reporting exists but is not actioned. Numbers are produced, glanced at, and filed, which is the worst kind of overhead.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'vulnerable', 'medium', 'Data is captured in multiple systems that do not talk. The hours spent reconciling are coming out of the work that produces revenue.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'vulnerable', 'medium', 'Lagging indicators are tracked, leading indicators are not. By the time the lagging metric moves, the window to influence it has closed.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', null, null, 'vulnerable', 'medium', 'The reporting cadence is irregular. Reviews happen when something breaks, which means they happen too late.'),
-- question-tied findings
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', '35d87e8f-7617-4bb5-a6dc-79a2b8eb3a66', 'failed_yes_no', null, 'high', 'You cannot see your own business in real time. Every important decision waits on someone manually pulling a report, which means decisions are slower and worse.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', 'cf63bd77-71c0-4f13-948b-5695a758a1bd', 'low_rating', null, 'high', 'Your team does not trust the numbers. When the data is questionable, decision-making collapses to whoever has the strongest opinion in the room.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', '79df082f-78d5-4bb4-8b48-cc2141b596ce', 'failed_yes_no', null, 'medium', 'There is no single dashboard the leadership team reviews together. Different people see different numbers, which means alignment is theatre rather than substance.'),
(gen_random_uuid(), '29d92313-f013-4a09-aa14-5edba23472c6', '5df9b99b-5850-440b-8f00-5a7e88ed5cc9', 'failed_yes_no', null, 'medium', 'Material business decisions are being made on instinct. Sometimes instinct is right. Often it is expensive.'),

-- ============================================================
-- PEOPLE AND CULTURE (b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2)
-- Q1 e06c4bfa: structured hiring process (yes_no)
-- Q2 239d5a06: regular performance reviews (yes_no)
-- Q3 aab0a5de: lost people you wanted to keep (yes_no, INVERTED)
-- Q4 5b0a169c: clarity on quarterly success (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'capable', 'low', 'People practices are sound and could be more deliberate. Codifying the existing informal standards would protect them as the team grows.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'capable', 'low', 'Reviews are happening and could be tied more tightly to development. A small change in structure would convert good intent into compounding growth.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'critical', 'high', 'You have lost people you wanted to keep. The cost of that turnover, in cash and in momentum, is larger than the salary line suggests.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'critical', 'high', 'Performance is reviewed inconsistently or not at all. Your best people are unrewarded and your weakest are uncorrected, which is the slowest way to lose both.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'critical', 'medium', 'Hiring is unstructured. Some hires work, some do not, and the difference is luck rather than process.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'critical', 'medium', 'Expectations are unclear. Without quarterly goals people set their own, which often do not align with what the business needs.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'vulnerable', 'medium', 'Reviews happen but are uneven. Some people get developed and others get forgotten, which the team notices even when you do not.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'vulnerable', 'medium', 'Onboarding is informal. New hires take three months to do what could take six weeks, which is a tax on every hire.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'vulnerable', 'medium', 'Culture is real and undefined. It works while the founder is in the room and weakens when the team grows beyond personal contact.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', null, null, 'vulnerable', 'medium', 'Career paths are implicit. Ambitious people are guessing at what the next step looks like, which is when they start taking calls from recruiters.'),
-- question-tied findings
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', '239d5a06-efb0-4476-8d07-9256a30f8999', 'failed_yes_no', null, 'high', 'Performance is reviewed inconsistently or not at all. Your best people are unrewarded and your underperformers are uncorrected.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', 'aab0a5de-3b59-4222-b9c7-df42a7357f76', 'inverted_failed', null, 'high', 'You have lost people in the last year you wanted to keep. The cost of that turnover is rarely the salary. It is the institutional knowledge that left with them.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', 'e06c4bfa-5583-4e88-ae6c-0fea28943612', 'failed_yes_no', null, 'medium', 'Hiring is unstructured, which produces inconsistent outcomes. Some hires work out, some do not, and you cannot tell why either happened.'),
(gen_random_uuid(), 'b4d6de3e-69a6-4dd1-83fc-f1335b8eaff2', '5b0a169c-59f3-42c2-9ca1-a8e99638a059', 'low_rating', null, 'medium', 'Your team does not have clear quarterly expectations. Without that clarity, motivation defaults to compliance rather than ownership.'),

-- ============================================================
-- TECHNOLOGY AND SYSTEMS (e049373e-b848-4ea2-a1f3-234af414d5c3)
-- Q1 43850e8e: documented stack with ownership (yes_no)
-- Q2 224b6a93: single source of truth for customer data (yes_no)
-- Q3 4cba544a: stack reviewed in last 12 months (yes_no)
-- Q4 3bf6bdf1: using technology to full capability (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'capable', 'low', 'The stack is in good shape and modestly bloated. A quarterly audit would catch the tools that have quietly stopped earning their keep.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'capable', 'low', 'Integrations are working and could be deeper. The next gain is in eliminating the last two or three manual handoffs between systems.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'critical', 'high', 'Customer and pipeline data lives in multiple parallel systems. This is the single largest source of internal friction and it is paid for in every meeting.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'critical', 'medium', 'Your stack has no designated owner. Tools accumulate, contracts auto-renew, and no one is responsible for whether the spend is producing value.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'critical', 'medium', 'Tools have been adopted but not integrated. The team is doing the integration work manually, which is the most expensive way to do it.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'critical', 'medium', 'Security and access have not been reviewed recently. Former contractors and old accounts likely still have access to things they should not.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'vulnerable', 'medium', 'The stack works and could work better. Two or three of your most-used tools are likely doing 30 percent of what you bought them for.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'vulnerable', 'medium', 'Adoption of new tools is patchy. Some of the team are deep, others are doing things the old way, which means you are paying for capability you are not using.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'vulnerable', 'medium', 'System health is checked when something breaks. Quarterly review would surface the slow degradations before they become outages.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', null, null, 'vulnerable', 'medium', 'Documentation of how systems fit together exists in fragments. Onboarding into the stack takes longer than it should because there is no single map.'),
-- question-tied findings
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', '224b6a93-8201-41d1-9b17-0c7463bfd89c', 'failed_yes_no', null, 'high', 'Customer and pipeline data lives in multiple parallel systems. This is the single most common cause of revenue leakage in mid-market businesses.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', '4cba544a-f71e-41d7-8b91-c18daa6f06a6', 'failed_yes_no', null, 'low', 'Your stack has not been reviewed for redundancy or gaps recently. You are likely paying for tools you have outgrown and missing tools you now need.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', '43850e8e-afe4-4c01-bf6b-db678d707111', 'failed_yes_no', null, 'medium', 'Your technology stack does not have designated owners. Tools accumulate, contracts auto-renew and no one is accountable for the spend or the integration.'),
(gen_random_uuid(), 'e049373e-b848-4ea2-a1f3-234af414d5c3', '3bf6bdf1-de8e-492a-a533-c1638f9cf0c3', 'low_rating', null, 'medium', 'Your team is using a fraction of what your existing tools can do. New software is rarely the answer when the existing software is underused.'),

-- ============================================================
-- CUSTOMER EXPERIENCE (cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e)
-- Q1 91f670d0: defined onboarding process (yes_no)
-- Q2 12497dcb: measuring NPS / satisfaction (yes_no)
-- Q3 b8788a2e: process for capturing feedback (yes_no)
-- Q4 793f9605: would know if customer unhappy (rating_1_5)
-- ============================================================

-- band findings
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'capable', 'low', 'Customer experience is strong and could be more systematic. The next gain is in turning the informal customer success motions into a written playbook.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'capable', 'low', 'Feedback is captured and lightly used. Closing the loop with customers on what changed because of their input would convert satisfaction into advocacy.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'critical', 'high', 'New customers experience a different version of your business depending on who handled them. Your weakest onboarding is what the market thinks you are.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'critical', 'high', 'You would not know a customer was about to leave until they had already left. By the time it shows up in revenue, retention work is too late.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'critical', 'medium', 'You are not measuring satisfaction. You will find out a customer is unhappy when they stop replying, which is the most expensive form of feedback.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'critical', 'medium', 'Feedback is being given and not captured. The patterns that would tell you what to fix are sitting in individual inboxes and Slack threads.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'vulnerable', 'medium', 'Onboarding is consistent enough and not deliberate. The first 30 days set the tone for the relationship and are being left to chance.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'vulnerable', 'medium', 'NPS or equivalent is run occasionally. Without a cadence, you cannot see whether the trend is up or down, which is the only number that matters.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'vulnerable', 'medium', 'Account management is reactive. You respond well when customers ask and you are not proactively shaping the relationship between asks.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', null, null, 'vulnerable', 'medium', 'Renewal conversations happen close to renewal. The expansion opportunities sit in the six months before that, and they are mostly being missed.'),
-- question-tied findings
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', '91f670d0-19be-49eb-95d5-17c155d7c5b9', 'failed_yes_no', null, 'high', 'New customers experience a different version of your business depending on who handles them. The most expensive moment in the customer relationship has the least process behind it.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', '793f9605-2c7c-4a65-9c89-bb30572526f8', 'low_rating', null, 'high', 'You would not know a customer was about to leave until they had already left. By that point, recovery is rarely possible.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', '12497dcb-d64c-4009-89c7-c2cffbfaec4e', 'failed_yes_no', null, 'medium', 'You are not measuring customer satisfaction. You will find out a customer is unhappy when they leave, which is too late to do anything about it.'),
(gen_random_uuid(), 'cb9c5f03-dd2e-4c1b-9471-06dc85bfee7e', 'b8788a2e-a5d0-4f08-9172-a4a0281536c7', 'failed_yes_no', null, 'medium', 'Feedback is being given but not captured systematically, which means it cannot be acted on at scale. Insight is being lost the moment it is offered.');
