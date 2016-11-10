delete from lecture;
alter sequence lecture_lid_seq restart with 1;
delete from venue;
alter sequence venue_vid_seq restart with 1;
delete from tag;
alter sequence tag_tid_seq restart with 1;

insert into tag (genre, eventbrite_id, eventbrite, meetup_id, meetup) values 
('Arts','{"105"}','{"Arts"}','{"1","18"}','{"Arts", "Book Clubs"}'),
('Business & Development','{"101"}','{"Business"}','{"2"}','{"Business"}'),
('Automotive','{"118"}','{"Auto, Boat & Air"}','{"3"}','{"Auto"}'),
('Community & Culture','{"111","113"}','{"Community", "Charity & Causes"}','{"4","33"}','{"Community", "Support"}'),
('Family','{"115"}','{"Family & Education"}','{"6","25"}','{"Education", "Moms & Dads"}'),
('Fashion & Beauty','{"106"}','{"Fashion"}','{"8"}','{"Fashion"}'),
('Sports & Fitness','{"108","107"}','{"Sports & Fitness", "Health"}','{"14","9","32"}','{"Well-being","Fitness", "Sports"}'),
('Food & Drink','{"110"}','{"Food & Drink"}','{"10"}','{"Food & Drink"}'),
('Politics','{"112"}','{"Government"}','{"13"}','{"Movements"}'),
('Hobbies','{"119"}','{"Hobbies"}','{"15","36","16","5","11","27"}','{"Crafts","Writing","Languages","Dancing","Games","Photography"}'),
('LGBT',null,null,'{"12"}','{"LGBT"}'),
('Home & Lifestyle','{"117"}','{"Home & Lifestyle"}','{"17","26","30","31"}','{"Lifestyle", "Pets", "Singles", "Social"}'),
('Film & Media','{"104"}','{"Film & Media"}','{"20"}','{"Movies & Films"}'),
('Music','{"103"}','{"Music"}','{"21"}','{"Music"}'),
('Spirituality','{"114"}','{"Spirituality"}','{"22","24","28"}','{"New Age & Spirituality", "Paranormal", "Beliefs"}'),
('Holidays','{"116"}','{"Holiday"}',null,null),
('Travel & Outdoors','{"109"}','{"Travel & Outdoor"}','{"23"}','{"Outdoors"}'),
('Science & Tech','{"102"}','{"Science & Tech"}','{"34","29"}','{"Tech", "Sci fi"}'),
('Misc','{"199"}','{"Other"}',null,null)
returning *;