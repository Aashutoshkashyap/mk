-- COMPREHENSIVE SEED DATA FROM https://sharpedge.com.np/

-- Clear existing data for fresh start
DELETE FROM public.hero_section;
DELETE FROM public.about_section;
DELETE FROM public.prefooter_cta;
DELETE FROM public.services;
DELETE FROM public.team_members;
DELETE FROM public.contact_info;
DELETE FROM public.stats;

-- Hero Section
INSERT INTO public.hero_section (title, subtitle, description, cta_text, cta_link, secondary_cta_text, secondary_cta_link)
VALUES (
  'Your Trusted Chartered Accountants in Nepal',
  'Professional CA Services for Auditing, Taxation, and Advisory in Nepal',
  'Sharp Egde Business Solutions is a firm that provides clients with a wide range of services in auditing assurance, taxation, regulatory matters, and advisory services.',
  'Explore Services',
  '/services',
  'About Us',
  '/about'
);

-- About Section
INSERT INTO public.about_section (heading, subheading, description, image_url, vision_title, vision_text, mission_title, mission_text)
VALUES (
  'About Sharp Edge',
  'Precision, Integrity, Excellence',
  'Sharp Egde Business Solutions is a firm that provides clients with a wide range of services in auditing assurance, taxation, regulatory matters, and advisory services. The firm''s team consists of dedicated and knowledgeable professionals, such as Chartered Accountants, Attorneys, and Consultants, offering a complete set of company services. Innovation is at the core of our operations. We continually seek new and innovative ways to meet the ever-evolving needs of our clients, ensuring that they are always one step ahead in today''s dynamic marketplace.',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
  'Our Vision',
  'Our goal is to be acknowledged globally as a prestigious, trusted, and highly respected professional firm, renowned for safeguarding clients'' interests with the utmost diligence and addressing their challenges through bespoke, cutting-edge solutions. To establish ourselves as a pioneering Chartered Accountants and advisory firm, continuously delivering world-class services.',
  'Our Mission',
  'We are committed to cultivating a dynamic, inclusive, and forward-thinking environment where our team excels, working in synergy with our clients to foster long-term success, growth, and resilience in an ever-evolving business landscape.'
);

-- Services
INSERT INTO public.services (icon_name, title, description, sort_order) VALUES
('FileText', 'Audit and Assurance', 'Our team combines the right skills and expertise to provide audit and assurance services. We aim to make the process seamless, ensuring our clients maximize the benefits.', 0),
('Gavel', 'Corporate Law', 'Our firm boasts a dedicated and highly experienced team specializing in Corporate Law Compliances.', 1),
('Calculator', 'Taxation', 'Our firm provides extensive tax services designed to keep clients up-to-date with evolving tax laws and offer expert advice on effective tax planning strategies.', 2),
('LineChart', 'Business Consulting', 'We offer a range of financial services, Accounting and Bookkeeping Services, Payroll Processing Services, Management Reporting, Advance Ruling Services and more.', 3);

-- Team Members
INSERT INTO public.team_members (name, role, experience, bio, sort_order) VALUES
('CA Subrat Sapkota', 'Managing Partner', '10+ Years', 'Subrat Sapkota serves as the managing partner of the Firm, boasting over 10 years of experience in auditing and consulting assignments across various sectors such as Manufacturing, Trading, Telecommunications, Insurance, Banking, Hospitality, Investment & Non-profit organizations.', 0),
('CA Diwash Dahal', 'Executive Partner', '10+ Years', 'Mr. Dahal boasts extensive experience in managing projects across various sectors such as Telecom, Trading, Import & Export, Tobacco Industry, Oil and Gas, Manufacturing, Hydro Power, Distribution, IT, and Service organizations.', 1),
('CA Nar Bahadur Budhayair', 'Quality Control Reviewer', '10+ Years', 'With extensive experience in overseeing assignments for Insurance, Manufacturing, Hydro, and Financial Service sector organizations, Mr. Budhayair also holds a position as an Audit faculty in an Institute in Nepal.', 2);

-- Stats (Estimated based on text)
INSERT INTO public.stats (icon_name, value, label, sort_order) VALUES
('Users', '10+', 'Years Experience', 0),
('CheckCircle2', '500+', 'Projects Completed', 1),
('Briefcase', '20+', 'Expert Consultants', 2),
('Award', '100%', 'Client Satisfaction', 3);

-- Contact Info
INSERT INTO public.contact_info (icon_name, title, details, action_label, action_href, sort_order) VALUES
('MapPin', 'Visit Us', '{"Sahabhagita Marga, Thapagaun- 10", "New Baneshwor, Kathmandu", "44600 Nepal"}', 'View on Map', 'https://goo.gl/maps/example', 0),
('Phone', 'Call Us', '{"+977 9841690746", "+977 9849501842"}', 'Call Now', 'tel:+9779841690746', 1),
('Mail', 'Email Support', '{"info@sharpedge.com.np", "support@sharpedge.com.np"}', 'Send Email', 'mailto:info@sharpedge.com.np', 2),
('Clock', 'Working Hours', '{"Sun-Fri: 9AM - 5PM", "Sat: Closed"}', 'View Full Schedule', '/contact', 3);

-- Pre-Footer CTA
INSERT INTO public.prefooter_cta (heading, description, cta_text, cta_link)
VALUES (
  'Ready to level up your business?',
  'Schedule a consultation with our expert Chartered Accountants today.',
  'Book a Call',
  '/contact'
);
