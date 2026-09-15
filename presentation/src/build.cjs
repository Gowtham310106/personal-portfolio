const pptxgen = require('pptxgenjs');
const IMG = __dirname + '/../mockups';

const P = { ink:'0B0B0F', ink7:'27272A', white:'FFFFFF', soft:'F7F7F5', soft2:'F1F1EF',
            line:'E3E3E0', acc:'FBC11F', accInk:'8A6408', accSoft:'FDEFC0',
            mut:'52525B', dim:'A1A1AA', dimD:'71717A' };
const F = 'Arial';
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';            // 13.333 x 7.5
pres.author = 'Build Fast Web';
pres.company = 'Build Fast Web';
pres.title = 'Build Fast Web — Capability Presentation';

const RR = pres.ShapeType.roundRect, RECT = pres.ShapeType.rect;
let page = 0;

const t = (s, text, o) => s.addText(text, Object.assign({ fontFace: F, isTextBox: true, margin: 0 }, o));

function foot(s, dark) {
  page++;
  const c = dark ? P.dimD : P.dim;
  t(s, 'buildfastweb.in   ·   hello@buildfastweb.in   ·   +91 97895 02278', { x:0.6, y:6.98, w:9, h:0.26, fontSize:8.5, color:c });
  t(s, String(page).padStart(2,'0'), { x:11.9, y:6.98, w:0.83, h:0.26, fontSize:8.5, color:c, align:'right' });
}
function head(s, title, sub) {
  t(s, title, { x:0.6, y:0.40, w:12.13, h:0.62, fontSize:27, bold:true, color:P.ink, charSpacing:-0.6 });
  if (sub) t(s, sub, { x:0.6, y:1.03, w:11, h:0.34, fontSize:12, color:P.mut });
}
function dots(s, items, x, y, w, rowH, size) {
  rowH = rowH || 0.52; size = size || 12;
  items.forEach((it, i) => {
    const yy = y + i * rowH;
    s.addShape(RR, { x:x, y:yy + 0.075, w:0.13, h:0.13, fill:{ color:P.acc }, rectRadius:0.035 });
    t(s, it, { x:x + 0.30, y:yy - 0.02, w:w - 0.30, h:rowH, fontSize:size, color:P.ink7, lineSpacingMultiple:1.12, valign:'top' });
  });
}
function outcome(s, text, x, y, w, h) {
  h = h || 1.18;
  s.addShape(RR, { x, y, w, h, fill:{ color:P.soft }, rectRadius:0.09 });
  t(s, 'WHAT CHANGES FOR THE OWNER', { x:x+0.3, y:y+0.17, w:w-0.6, h:0.22, fontSize:8.5, bold:true, color:P.accInk, charSpacing:1.1 });
  t(s, text, { x:x+0.3, y:y+0.44, w:w-0.6, h:h-0.58, fontSize:11.5, color:P.ink7, lineSpacingMultiple:1.14, valign:'top' });
}
function shot(s, file, x, y, w, cap) {
  const h = w * 840 / 1400;
  s.addShape(RECT, { x:x-0.028, y:y-0.028, w:w+0.056, h:h+0.056, fill:{ color:P.line } });
  s.addImage({ path:`${IMG}/${file}.png`, x, y, w, h });
  if (cap) t(s, cap, { x, y:y + h + 0.14, w, h:0.26, fontSize:9, color:P.dim });
  return y + h;
}
function markSmall(s, x, y, size) { s.addImage({ path:`${IMG}/logo.png`, x, y, w:size, h:size }); }

// ---- slide types -----------------------------------------------------------
function featureSlide(o) {
  const s = pres.addSlide();
  head(s, o.title, o.sub);
  dots(s, o.items, 0.6, 1.64, 3.95, o.rowH || 0.52);
  outcome(s, o.outcome, 0.6, o.outY || 4.86, 3.95, o.outH || 1.56);
  shot(s, o.img, 4.9, 1.58, 7.85, o.cap);
  foot(s);
  if (o.notes) s.addNotes(o.notes);
  return s;
}
function sectionSlide(num, title, sub, items) {
  const s = pres.addSlide();
  s.background = { color: P.ink };
  t(s, num, { x:0.6, y:1.5, w:2, h:1.4, fontSize:76, bold:true, color:P.acc, charSpacing:-2 });
  t(s, title, { x:0.6, y:3.05, w:6.6, h:1.5, fontSize:36, bold:true, color:P.white, charSpacing:-1, lineSpacingMultiple:1.02 });
  t(s, sub, { x:0.6, y:4.62, w:6.2, h:0.9, fontSize:13, color:P.dim, lineSpacingMultiple:1.2 });
  items.forEach((it, i) => {
    const yy = 1.62 + i * 0.62;
    s.addShape(RR, { x:7.9, y:yy + 0.09, w:0.13, h:0.13, fill:{ color:P.acc }, rectRadius:0.035 });
    t(s, it, { x:8.22, y:yy - 0.02, w:4.5, h:0.55, fontSize:13, color:P.white, valign:'top' });
  });
  foot(s, true);
  return s;
}
function flowSlide(o) {
  const s = pres.addSlide();
  head(s, o.title, o.sub);
  const n = o.steps.length, gap = 0.22, w = (12.13 - gap * (n - 1)) / n;
  o.steps.forEach((st, i) => {
    const x = 0.6 + i * (w + gap), dark = i === 0 || i === n - 1;
    s.addShape(RR, { x, y:1.70, w, h:2.60, fill:{ color: dark ? P.ink : P.soft }, rectRadius:0.1 });
    t(s, String(i + 1).padStart(2, '0'), { x:x+0.26, y:1.93, w:w-0.5, h:0.3, fontSize:11, bold:true, color: dark ? P.acc : P.accInk, charSpacing:0.8 });
    t(s, st.h, { x:x+0.26, y:2.31, w:w-0.5, h:0.62, fontSize:13.5, bold:true, color: dark ? P.white : P.ink, lineSpacingMultiple:1.05, valign:'top' });
    t(s, st.b, { x:x+0.26, y:2.98, w:w-0.5, h:1.28, fontSize:10.5, color: dark ? P.dim : P.mut, lineSpacingMultiple:1.16, valign:'top' });
    if (i < n - 1) t(s, '→', { x:x + w + 0.01, y:2.84, w:0.2, h:0.3, fontSize:13, color:P.dim, align:'center' });
  });
  // lower band
  t(s, o.bandTitle, { x:0.6, y:4.50, w:12.13, h:0.3, fontSize:11, bold:true, color:P.accInk, charSpacing:1 });
  const m = o.band.length, bw = (12.13 - 0.22 * (m - 1)) / m;
  o.band.forEach((b, i) => {
    const x = 0.6 + i * (bw + 0.22);
    s.addShape(RR, { x, y:4.82, w:bw, h:1.40, fill:{ color:P.white }, line:{ color:P.line, width:1 }, rectRadius:0.09 });
    t(s, b.h, { x:x+0.24, y:5.02, w:bw-0.48, h:0.52, fontSize:12, bold:true, color:P.ink, lineSpacingMultiple:1.05, valign:'top' });
    t(s, b.b, { x:x+0.24, y:5.56, w:bw-0.48, h:0.6, fontSize:10, color:P.mut, lineSpacingMultiple:1.14, valign:'top' });
  });
  if (o.note) t(s, o.note, { x:0.6, y:6.40, w:12.13, h:0.34, fontSize:10.5, color:P.mut, italic:true });
  foot(s);
  if (o.notes) s.addNotes(o.notes);
  return s;
}
function cardGrid(o) {                       // cols x rows of titled cards
  const s = pres.addSlide();
  head(s, o.title, o.sub);
  const cols = o.cols, gapX = 0.22, gapY = 0.22;
  const w = (12.13 - gapX * (cols - 1)) / cols;
  o.cards.forEach((c, i) => {
    const r = Math.floor(i / cols), col = i % cols;
    const x = 0.6 + col * (w + gapX), y = o.top + r * (o.rowH + gapY);
    const dark = o.darkIndex === i;
    s.addShape(RR, { x, y, w, h:o.rowH, fill:{ color: dark ? P.ink : P.white }, line: dark ? null : { color:P.line, width:1 }, rectRadius:0.1 });
    if (c.n) t(s, c.n, { x:x+0.26, y:y+0.2, w:w-0.5, h:0.26, fontSize:10.5, bold:true, color: dark ? P.acc : P.accInk, charSpacing:0.9 });
    t(s, c.h, { x:x+0.26, y:y + (c.n ? 0.54 : 0.24), w:w-0.5, h:0.56, fontSize:o.hSize || 14, bold:true, color: dark ? P.white : P.ink, lineSpacingMultiple:1.03, valign:'top' });
    t(s, c.b, { x:x+0.26, y:y + (c.n ? 1.08 : 0.78), w:w-0.5, h:o.rowH - (c.n ? 1.24 : 0.96), fontSize:o.bSize || 11, color: dark ? P.dim : P.mut, lineSpacingMultiple:1.16, valign:'top' });
  });
  if (o.note) t(s, o.note, { x:0.6, y:o.noteY || 6.42, w:12.13, h:0.34, fontSize:10.5, color:P.mut, italic:true });
  foot(s);
  if (o.notes) s.addNotes(o.notes);
  return s;
}

/* ═══════════════ 1. COVER ═══════════════ */
{
  const s = pres.addSlide();
  s.background = { color: P.ink };
  markSmall(s, 0.6, 0.55, 0.78);
  t(s, 'BUILD FAST WEB', { x:1.52, y:0.72, w:5, h:0.45, fontSize:15, bold:true, color:P.white, charSpacing:2.4 });
  t(s, 'Manual work in,\ndigital systems out.', { x:0.6, y:2.25, w:9.4, h:2.1, fontSize:47, bold:true, color:P.white, charSpacing:-1.4, lineSpacingMultiple:1.0 });
  t(s, 'Websites, business software, ERPs and AI automation for schools, colleges, clinics, fuel stations, hotels, traders and agencies.',
     { x:0.6, y:4.55, w:8.7, h:0.9, fontSize:14, color:P.dim, lineSpacingMultiple:1.3 });
  s.addShape(RR, { x:0.6, y:5.75, w:12.13, h:0.02, fill:{ color:'27272A' } });
  t(s, 'Gowtham  ·  Founder', { x:0.6, y:6.05, w:4, h:0.3, fontSize:12, bold:true, color:P.white });
  t(s, 'hello@buildfastweb.in', { x:4.8, y:6.05, w:4, h:0.3, fontSize:12, color:P.acc });
  t(s, 'buildfastweb.in', { x:9.4, y:6.05, w:3.33, h:0.3, fontSize:12, color:P.dim, align:'right' });
  t(s, 'Tamil Nadu, India  ·  Working with businesses across India, UAE & the US', { x:0.6, y:6.42, w:12.13, h:0.3, fontSize:10.5, color:P.dimD });
  s.addNotes('Opening line: I build the software that runs a business day to day — and the website that brings it customers. This deck walks through what I have already built and what I can build for you.');
  page++;
}

/* ═══════════════ 2. WHAT WE DO ═══════════════ */
{
  const s = pres.addSlide();
  head(s, 'Three things I build', 'Most clients start with one and come back for the next.');
  const cards = [
    { n:'01', h:'Websites & web apps', b:'Marketing sites, landing pages for ads, e-commerce stores and customer portals — fast, search-ready and built to convert visitors into enquiries.' },
    { n:'02', h:'Custom business software', b:'ERPs and operations systems: school, college, clinic, fuel station, hotel, inventory, society, agency. Registers and Excel files replaced by one system.' },
    { n:'03', h:'AI & automation', b:'AI receptionist on your phone line, chatbots on your site, WhatsApp auto-replies, payment reminders and follow-up sequences that never forget.' },
  ];
  const w = (12.13 - 0.44) / 3;
  cards.forEach((c, i) => {
    const x = 0.6 + i * (w + 0.22), dark = i === 1;
    s.addShape(RR, { x, y:1.62, w, h:3.0, fill:{ color: dark ? P.ink : P.white }, line: dark ? null : { color:P.line, width:1 }, rectRadius:0.11 });
    t(s, c.n, { x:x+0.3, y:1.88, w:1, h:0.3, fontSize:11, bold:true, color: dark ? P.acc : P.accInk, charSpacing:1 });
    t(s, c.h, { x:x+0.3, y:2.28, w:w-0.6, h:0.7, fontSize:17, bold:true, color: dark ? P.white : P.ink, charSpacing:-0.3, lineSpacingMultiple:1.04, valign:'top' });
    t(s, c.b, { x:x+0.3, y:3.02, w:w-0.6, h:1.4, fontSize:11.5, color: dark ? P.dim : P.mut, lineSpacingMultiple:1.2, valign:'top' });
  });
  const stats = [['20+','Clients served'],['25+','Projects delivered'],['08','Industries'],['03','Countries']];
  const sw = (12.13 - 0.66) / 4;
  stats.forEach((st, i) => {
    const x = 0.6 + i * (sw + 0.22);
    s.addShape(RR, { x, y:4.86, w:sw, h:1.32, fill:{ color:P.soft }, rectRadius:0.1 });
    t(s, st[0], { x:x+0.28, y:5.04, w:sw-0.56, h:0.6, fontSize:30, bold:true, color:P.ink, charSpacing:-1 });
    t(s, st[1], { x:x+0.28, y:5.66, w:sw-0.56, h:0.34, fontSize:11, color:P.mut });
  });
  t(s, 'Education · fuel retail · healthcare · field services · hospitality · retail & e-commerce · real estate · agencies',
     { x:0.6, y:6.42, w:12.13, h:0.3, fontSize:10.5, color:P.mut, italic:true });
  foot(s);
  s.addNotes('Keep this short — the detail comes in the system slides.');
}

/* ═══════════════ 3. PROOF ═══════════════ */
{
  const s = pres.addSlide();
  head(s, 'Systems already running', 'Delivered work — every one of these is live or in daily use.');
  const rows = [
    ['Velammal Institute of Technology', 'Online admission portal'],
    ['PSR Petrol Pump', 'Fuel station operations'],
    ['Asian Pest Control', 'Field-service CRM + site'],
    ["Guppy's World", 'Store with online payments'],
    ['AntHands', 'Store + workshop booking'],
    ['Royal Fins', 'E-commerce store'],
    ['Lobes', 'E-commerce platform'],
    ['Snap Tales', 'Gifts store + event booking'],
    ['Sticky Moments', 'Custom gift store'],
    ['Tvoy Dom', 'Rental marketplace, Russia'],
  ];
  const w = (12.13 - 0.22) / 2;
  rows.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * (w + 0.22), y = 1.66 + row * 0.66;
    s.addShape(RR, { x, y, w, h:0.56, fill:{ color: i % 2 === 0 ? P.soft : P.white }, line:{ color:P.line, width:1 }, rectRadius:0.07 });
    t(s, r[0], { x:x+0.24, y:y+0.13, w:w*0.56, h:0.3, fontSize:12, bold:true, color:P.ink });
    t(s, r[1], { x:x + w*0.58, y:y+0.13, w:w*0.4 - 0.24, h:0.3, fontSize:11, color:P.mut, align:'right' });
  });
  s.addShape(RR, { x:0.6, y:5.22, w:12.13, h:0.96, fill:{ color:P.ink }, rectRadius:0.1 });
  t(s, 'The same team builds it, launches it, trains your staff and answers the phone afterwards — you deal with one person, not a ticket queue.',
     { x:0.95, y:5.52, w:11.4, h:0.4, fontSize:13, color:P.white });
  t(s, 'Client names and systems as delivered. Screens in this deck are product views of these systems with sample data.',
     { x:0.6, y:6.42, w:12.13, h:0.3, fontSize:10.5, color:P.mut, italic:true });
  foot(s);
}

/* ═══════════════ 4. BEFORE / AFTER ═══════════════ */
{
  const s = pres.addSlide();
  head(s, 'What I am actually replacing', 'Every project starts the same way — with the registers and the WhatsApp groups.');
  const before = ['Registers, notebooks and paper files','Twelve Excel sheets, none of them current','Job instructions over WhatsApp groups','Bills and receipts written by hand','Payment follow-ups nobody remembers to make','Missed calls that quietly become lost customers'];
  const after  = ['One system your whole team logs into','Live numbers — attendance, sales, dues, stock','Work assigned, tracked and closed inside the system','GST-ready invoices and receipts generated in seconds','Reminders that go out automatically, every time','Every call and enquiry answered in seconds, day or night'];
  s.addShape(RR, { x:0.6, y:1.62, w:5.95, h:4.55, fill:{ color:P.white }, line:{ color:P.line, width:1 }, rectRadius:0.11 });
  t(s, 'HOW IT RUNS TODAY', { x:0.92, y:1.92, w:5.3, h:0.3, fontSize:10.5, bold:true, color:P.mut, charSpacing:1.2 });
  before.forEach((b, i) => {
    t(s, '—', { x:0.92, y:2.42 + i*0.62, w:0.25, h:0.3, fontSize:12, color:P.dim });
    t(s, b, { x:1.22, y:2.42 + i*0.62, w:5.0, h:0.56, fontSize:12.5, color:P.ink7, lineSpacingMultiple:1.1, valign:'top' });
  });
  s.addShape(RR, { x:6.78, y:1.62, w:5.95, h:4.55, fill:{ color:P.ink }, rectRadius:0.11 });
  t(s, 'AFTER THE SYSTEM GOES LIVE', { x:7.1, y:1.92, w:5.3, h:0.3, fontSize:10.5, bold:true, color:P.acc, charSpacing:1.2 });
  after.forEach((b, i) => {
    s.addShape(RR, { x:7.1, y:2.5 + i*0.62, w:0.13, h:0.13, fill:{ color:P.acc }, rectRadius:0.035 });
    t(s, b, { x:7.42, y:2.42 + i*0.62, w:5.0, h:0.56, fontSize:12.5, color:P.white, lineSpacingMultiple:1.1, valign:'top' });
  });
  t(s, 'Nothing is thrown away on day one — existing data is migrated in, and staff are trained on a call they can record.',
     { x:0.6, y:6.42, w:12.13, h:0.3, fontSize:10.5, color:P.mut, italic:true });
  foot(s);
}

/* ═══════════════ 5. SECTION — SYSTEMS ═══════════════ */
sectionSlide('01', 'Systems I build\nfor your industry', 'Ten operations systems, already designed and proven. Yours is configured to how you actually work — not the other way round.',
  ['School ERP', 'College ERP', 'Admission system', 'Clinic & hospital management', 'Petrol pump software', 'Restaurant POS & digital menu', 'Hotel & booking system', 'Inventory, quotation & billing']);

/* ═══════════════ 6. INDEX GRID ═══════════════ */
cardGrid({
  title: 'The ready-made systems',
  sub: 'Each one is a working product — we configure and extend it for your business instead of starting from a blank page.',
  cols: 5, top: 1.95, rowH: 1.86, hSize: 13, bSize: 10,
  cards: [
    { h:'School ERP', b:'Admissions, attendance, fees, exams, timetable, parent portal' },
    { h:'College ERP', b:'Departments, semesters, internal marks, hostel, placements' },
    { h:'Admission system', b:'Online applications, documents, merit list, seat allotment' },
    { h:'Clinic & hospital', b:'Appointments, patient records, billing, lab, pharmacy' },
    { h:'Petrol pump', b:'Shifts, nozzle sales, tank stock, credit customers, salary' },
    { h:'Restaurant POS', b:'Billing, KOT, QR menu, delivery, item-wise reports' },
    { h:'Hotel & booking', b:'Live availability, bookings, check-in, folio billing' },
    { h:'Inventory & billing', b:'Stock, batches, quotation to invoice, GST, receivables' },
    { h:'Society management', b:'Maintenance billing, visitors, complaints, resident app' },
    { h:'Agency & projects', b:'Leads, projects, milestones, invoices, payment tracking' },
  ],
  note: 'Not on this list? Slide 27 shows how any business system gets built from the same set of parts.',
});

/* ═══════════════ 7–16. THE SYSTEM SLIDES ═══════════════ */
featureSlide({
  title: 'School ERP', sub: 'For schools, matriculation & CBSE institutions and coaching centres.',
  items: ['Admission enquiries, applications and follow-up','Attendance by class, section and staff','Fee demand, collection and auto-reminders','Exams, mark entry, report cards and progress','Timetable, substitutions, transport and hostel','Parent portal with SMS and WhatsApp updates'],
  outcome: 'The principal opens one screen and sees roll strength, today\'s attendance, fees collected and who owes money — as of this minute, not last month.',
  img: 'school', cap: 'School ERP — principal\'s dashboard',
  notes: 'Point at the outstanding card: ₹8.4L from 126 students, with reminders already sent automatically.',
});
featureSlide({
  title: 'College ERP', sub: 'For engineering, arts & science colleges and polytechnics.',
  items: ['Departments, programmes and semesters','Course registration and internal marks (CIA)','Attendance shortage, condonation and approvals','Fees, scholarships, hostel and transport','Faculty workload, timetable and substitutions','Placement drives, offers and NAAC reports'],
  outcome: 'Six departments, 3,400 students, and every report the office has to file — generated from the same data the staff enter once.',
  img: 'college', cap: 'College ERP — registrar\'s overview',
});
featureSlide({
  title: 'Admission system', sub: 'A standalone portal when admissions are the bottleneck — with or without the full ERP.',
  items: ['Public application form with document upload','Application and admission fees paid online','Admin review panel — verify, shortlist, reject','Merit list, seat allotment and confirmation','Automatic SMS, WhatsApp and email updates','Follow-up queue for unpaid applications'],
  outcome: 'Built for Velammal Institute of Technology — the first digital admission system in the institution\'s history. Paper collection and manual tracking gone entirely.',
  img: 'admission', cap: 'Admission system — admissions office panel',
  notes: 'This is a real delivered project: admission.velammalitech.edu.in',
});
featureSlide({
  title: 'Clinic & hospital management', sub: 'For clinics, dental and dermatology practices, diagnostic centres and multi-doctor setups.',
  items: ['Appointments, doctor schedules and live queue','Patient records, case history and prescriptions','Billing, receipts, packages and insurance','Lab tests, reports and pharmacy stock','Automatic visit and follow-up reminders','Online booking page + AI receptionist'],
  outcome: 'The front desk stops writing in a register, no-shows fall because reminders go out on their own, and any patient\'s history is one search away.',
  img: 'clinic', cap: 'Clinic management — front desk view',
});
featureSlide({
  title: 'Petrol pump software', sub: 'For fuel stations and bunk owners running one outlet or several.',
  items: ['Shift management with meter readings','Nozzle-wise fuel sales and cash reconciliation','Tank stock, dip readings and purchase indents','Credit customers, limits and outstanding ageing','Staff attendance with salary auto-calculated','Expenses, day book and monthly reports'],
  outcome: 'Live at PSR Petrol Pump. Shift tallies, staff salary and monthly reports that used to take a day of notebook work now take seconds.',
  img: 'petrol', cap: 'Petrol pump software — owner\'s dashboard',
  notes: 'Real delivered project: psr.mypetrolpump.in — shifts, sales, staff, salary, expenses and reports.',
});
featureSlide({
  title: 'Restaurant POS & digital menu', sub: 'For restaurants, cafés, bakeries and cloud kitchens.',
  items: ['Billing POS with KOT printing to the kitchen','QR digital menu — guests order from the table','Dine-in, takeaway and delivery in one screen','Table map, split bills, UPI, card and cash','Item-wise, hour-wise and staff-wise reports','Ingredient inventory with low-stock alerts'],
  outcome: 'Orders stop getting lost between the floor and the kitchen, tables turn faster, and the day\'s sales report is ready before you leave.',
  img: 'restaurant', cap: 'Restaurant POS — live floor',
});
featureSlide({
  title: 'Hotel & room booking system', sub: 'For hotels, resorts, service apartments and banquet halls.',
  items: ['Live room availability across every channel','Booking engine on your site, no commission','Check-in, check-out, folio and GST billing','Housekeeping status and maintenance blocks','Automatic confirmations and reminders','Banquet and event enquiries too'],
  outcome: 'A room sold at the desk disappears from your website instantly — double-booking stops being possible, and direct bookings cost you nothing in commission.',
  img: 'hotel', cap: 'Hotel & booking system — front office',
});
featureSlide({
  title: 'Inventory, quotation & billing', sub: 'For traders, distributors, manufacturers and dealers.',
  items: ['Stock in and out with batch and expiry tracking','Quotation to invoice in one click, GST ready','Purchase orders and vendor ledger','Customer ledger, credit limits and receivables','Low-stock and payment-due alerts','Multiple warehouses and role-based access'],
  outcome: 'You always know what is in the godown, what is owed to you, and exactly who to chase today — without opening a single spreadsheet.',
  img: 'inventory', cap: 'Inventory & billing — stock and receivables',
});
featureSlide({
  title: 'Apartment & society management', sub: 'For apartments, gated communities, builders and associations.',
  items: ['Maintenance billing and online collection','Resident app — dues, receipts, notices','Visitor and delivery management at the gate','Complaint tracking with SLA and escalation','Amenity booking for clubhouse and halls','Vendor payments, expenses and audit trail'],
  outcome: 'The committee can show every rupee collected and spent at the next meeting, and residents stop asking where the maintenance money went.',
  img: 'society', cap: 'Society management — association dashboard',
});
featureSlide({
  title: 'Agency, project & payment tracking', sub: 'For agencies, contractors, service companies and field teams.',
  items: ['Lead and enquiry CRM with follow-up reminders','Projects, tasks, sprints and timelines','Team workload and time tracking','Quotations, milestone invoices and payments','Expenses and profitability per project','Client portal — progress without calls'],
  outcome: 'Every project\'s stage and every pending rupee on one screen. The same engine runs field-service jobs, technician checklists and service certificates.',
  img: 'agency', cap: 'Agency system — projects and payments',
  notes: 'Asian Pest Control runs this shape of system: customers, enquiries, quotations, work orders, invoices, payments, technician checklists and certificates.',
});

/* ═══════════════ SECTION — WEBSITES ═══════════════ */
sectionSlide('02', 'Websites that\nbring the work in', 'A site is not a brochure. It is the first employee your customer meets — it should be fast, easy to find and always asking for the enquiry.',
  ['Business & corporate websites', 'Landing pages built for ad traffic', 'E-commerce stores with payments', 'Customer portals & web apps', 'Technical SEO & Core Web Vitals', 'Google Business & local SEO', 'Meta and Google Ads campaigns', 'Analytics and lead attribution']);

featureSlide({
  title: 'Website & e-commerce development', sub: 'Built to load in under two seconds and to turn traffic into enquiries.',
  items: ['Business, corporate and service websites','Landing pages engineered for ad campaigns','E-commerce with payments and shipping','Customer portals and web applications','Technical SEO, schema and page speed','Enquiry forms, WhatsApp handoff, chatbot'],
  outcome: 'Failed payments get captured as leads instead of vanishing, and you can see which rupee of ad spend brought which enquiry.',
  img: 'store', cap: 'Store & website admin — revenue, orders and traffic',
  notes: 'Guppy\'s World: 60K+ Instagram followers moved into a structured buying flow, with failed payments captured as leads.',
});

/* ═══════════════ SECTION — AI ═══════════════ */
sectionSlide('03', 'AI that answers,\nbooks and follows up', 'The work that happens after hours, on Sundays, and while you are already on another call — handled without adding staff.',
  ['AI receptionist on your phone line', 'Outbound AI calling campaigns', 'Website & WhatsApp chatbots', 'Online booking with payment', 'Automatic payment reminders', 'Follow-up sequences for cold leads', 'Daily owner report on WhatsApp', 'Workflow automation between tools']);

featureSlide({
  title: 'AI receptionist', sub: 'It answers your phone the way a trained front-desk person would — every time, at any hour.',
  items: ['Answers every call — night, Sunday, festival day','Speaks English, Tamil and Hindi','Knows your services, timings and pricing','Captures the caller\'s name, number and intent','Books the slot straight into your calendar','Hands over to a human the moment it should'],
  outcome: '29 of today\'s 86 calls came in after office hours. Every one was answered, and 23 appointments were booked without a single staff member picking up.',
  img: 'aicall', cap: 'AI receptionist — live call and captured details',
});

flowSlide({
  title: 'How the AI receptionist works',
  sub: 'Six steps, all of them automatic. Nothing changes about the number your customers already call.',
  steps: [
    { h:'Call comes in', b:'Your existing number, or a new one. Missed and busy calls divert to the AI.' },
    { h:'Answered in two rings', b:'A natural voice, in the caller\'s language, with your business name.' },
    { h:'Understands the intent', b:'Booking, price, timing, location, complaint or a returning customer.' },
    { h:'Answers from your knowledge', b:'Trained on your services, rates, timings and FAQs. It does not invent answers.' },
    { h:'Books or captures', b:'Writes the appointment into your calendar and records name, number and need.' },
    { h:'You get the summary', b:'WhatsApp message and CRM entry with the transcript, intent and next action.' },
  ],
  bandTitle: 'BUILT IN',
  band: [
    { h:'Human handover', b:'Transfers to your staff with the conversation already summarised.' },
    { h:'Every call recorded', b:'Recording and transcript stored against the caller\'s number.' },
    { h:'WhatsApp follow-through', b:'Confirmation, location pin and reminder sent automatically.' },
    { h:'Works with your CRM', b:'Leads land in the system you already use — or the one I build.' },
  ],
  note: 'Typical setup time: 1–3 weeks, including training it on your business and testing it on real calls.',
});

flowSlide({
  title: 'Outbound AI calling',
  sub: 'The same voice, working the other direction — calling your list instead of waiting for it to call you.',
  steps: [
    { h:'Load the list', b:'Fee dues, pending payments, old enquiries, no-shows or a fresh campaign list.' },
    { h:'AI calls each number', b:'At the hours you choose, retrying the ones that do not pick up.' },
    { h:'Asks your questions', b:'The qualifying script you approve — budget, timeline, interest, confirmation.' },
    { h:'Interested → booked', b:'Books the appointment or transfers a warm caller to you straight away.' },
    { h:'Not interested → tagged', b:'Marked with the reason so nobody wastes another call on them.' },
    { h:'Results in the dashboard', b:'Answered, booked, callback, refused — with recordings against each number.' },
  ],
  bandTitle: 'WHAT PEOPLE USE IT FOR',
  band: [
    { h:'Fee & payment reminders', b:'Schools, clinics and traders chasing dues without staff time.' },
    { h:'Admission follow-ups', b:'Calling every enquiry from the ad campaign, the same day.' },
    { h:'Cold lead revival', b:'Six months of unworked enquiries called in a week.' },
    { h:'Appointment confirmations', b:'Confirm, reschedule or cancel before the slot is wasted.' },
  ],
  note: 'You approve the script and the calling window. Numbers that ask not to be called again are removed automatically.',
});

featureSlide({
  title: 'Website & WhatsApp chatbot', sub: 'Trained on your business, answering while the visitor is still on the page.',
  items: ['Trained on your services, pricing and FAQs','Replies in about a second, day or night','Answers roughly 8 in 10 questions without you','Asks for the name and number naturally','Emails you the lead and pings your WhatsApp','Hands over to a human when it should'],
  outcome: 'A visitor who would have closed the tab at 11pm becomes a named lead with a phone number and a scheduled callback.',
  img: 'chatbot', cap: 'Chatbot console — live chat and the lead it captured',
});

featureSlide({
  title: 'Online booking & appointments', sub: 'Customers book and pay themselves — from the website, WhatsApp, Instagram or a phone call.',
  items: ['Live slot calendar on your own booking page','Advance or full payment collected at booking','Staff, service and duration-wise availability','Confirmation on WhatsApp, email and calendar','Reminders 24 hours and 2 hours before','Review request and rebooking link afterwards'],
  outcome: '62% of bookings come in after the office closes, and no-shows drop from around 19% to 4% once reminders run on their own.',
  img: 'booking', cap: 'Booking system — calendar, payments and reminders',
});

cardGrid({
  title: 'Automations that run without you',
  sub: 'Small pieces of work that quietly cost you money when a human has to remember them.',
  cols: 3, top: 1.89, rowH: 1.96, hSize: 15, bSize: 11,
  cards: [
    { h:'Instant lead response', b:'Every enquiry from the site, ads or Instagram gets a reply within seconds — before your competitor answers.' },
    { h:'Payment & bill reminders', b:'Outstanding amounts chased on a schedule over WhatsApp, SMS and voice, with a payment link attached.' },
    { h:'Follow-up sequences', b:'Cold enquiries worked for weeks — day 1, day 3, day 7 — instead of being forgotten after one call.' },
    { h:'Daily owner report', b:'Sales, collections, attendance and pending items delivered to your WhatsApp every evening.' },
    { h:'Document automation', b:'Invoices, receipts, service certificates and report cards generated and sent, not typed.' },
    { h:'Tool-to-tool workflows', b:'Your website, CRM, accounting, WhatsApp and Google Sheets kept in step without copy-paste.' },
  ],
  note: 'Most automations are live within one to three weeks and run on top of whatever system you already use.',
});

/* ═══════════════ SECTION — ANYTHING ELSE ═══════════════ */
sectionSlide('04', 'Your business is\nnot on the list?', 'Every system above is assembled from the same set of parts. That is why a new one takes weeks, not years — and why the price is fixed before we start.',
  ['Tell me how the work flows today', 'I map the manual steps worth killing', 'You get a screen-by-screen blueprint', 'And a fixed quote, before any code', 'Clickable design you approve first', 'Weekly builds you can watch', 'Data migrated, staff trained', 'Support you can reach on WhatsApp']);

cardGrid({
  title: 'The parts every custom system is built from',
  sub: 'Pick the ones your business needs — clinic, gym, school, factory, transport, real estate, salon, workshop, anything.',
  cols: 5, top: 1.95, rowH: 1.86, hSize: 13, bSize: 10,
  cards: [
    { h:'Roles & logins', b:'Owner, manager, staff and customer — each sees only what they should' },
    { h:'Live dashboard', b:'The four or five numbers that tell you how today is going' },
    { h:'Masters & records', b:'Customers, students, patients, vehicles, properties, items' },
    { h:'Billing & payments', b:'Quotations, invoices, receipts, GST, UPI and payment links' },
    { h:'Inventory & assets', b:'Stock, batches, expiry, serial numbers, service history' },
    { h:'Scheduling', b:'Appointments, shifts, jobs, routes, rooms and slots' },
    { h:'Field & job cards', b:'Work orders, checklists, photos and digital certificates' },
    { h:'Reports & exports', b:'Daily, monthly, GST, statutory — in the format you already file' },
    { h:'Notifications', b:'WhatsApp, SMS and email triggered by what happens in the system' },
    { h:'Mobile app', b:'Android and iOS for customers or field staff, one shared backend' },
  ],
  note: 'Platform or SaaS product idea? The same parts, plus multi-tenant accounts, subscriptions and an admin console.',
});

cardGrid({
  title: 'Mobile apps & interface design',
  sub: 'Two things that decide whether your team actually uses what you paid for.',
  cols: 2, top: 1.80, rowH: 2.10, hSize: 16, bSize: 11.5,
  cards: [
    { h:'Mobile app development', b:'Android and iOS from one codebase — customer apps, staff and field apps with offline support, ordering, booking and delivery flows, push notifications, and Play Store / App Store publishing. One backend shared with your web dashboard.' },
    { h:'UI/UX design', b:'Product and dashboard interfaces, clickable prototypes before a line of code is written, a brand kit of colours, type and components, and a handoff any future developer can read. Staff stop asking "where do I click?" on day two.' },
    { h:'Design you approve first', b:'You click through the real flow on screen and change your mind while changes are still free — not after the build.' },
    { h:'Training that sticks', b:'Your team is trained on a recorded call, with handover documents, so a new joiner next year is not stuck.' },
  ],
  note: 'Typical timelines: UI/UX 1–3 weeks · mobile app 4–10 weeks · both quoted as a fixed price.',
});

/* ═══════════════ PROCESS ═══════════════ */
cardGrid({
  title: 'How we work together',
  sub: 'Six steps from the first call to a system your staff are trained on. No hourly billing, no surprises halfway.',
  cols: 3, top: 1.86, rowH: 1.98, hSize: 15, bSize: 11,
  cards: [
    { n:'DAY 1', h:'Discovery call', b:'30 minutes on how your business actually runs today — the registers, the WhatsApp groups, the Excel sheets.' },
    { n:'DAY 2–4', h:'Blueprint & fixed quote', b:'A written scope, a screen-by-screen plan and a fixed price. No "that\'s extra" once we start.' },
    { n:'WEEK 1', h:'Design you approve', b:'Clickable screens before any code is written. You change your mind while changes are still free.' },
    { n:'WEEK 2+', h:'Build in weekly sprints', b:'Every week a live link and a short video walkthrough. You watch it grow instead of waiting in the dark.' },
    { n:'GO-LIVE', h:'Launch & train the team', b:'Existing data migrated, system live, staff trained on a call they can record. Handover documents included.' },
    { n:'ONGOING', h:'Support that answers', b:'30 days of free post-launch support, then an optional care plan. You message a human on WhatsApp.' },
  ],
  note: 'Typical build times: website 2–4 weeks · ERP or custom software 4–8 weeks · AI and automation 1–3 weeks.',
});

/* ═══════════════ CASE STUDIES ═══════════════ */
{
  const s = pres.addSlide();
  head(s, 'Three of the systems in detail', 'Delivered projects — what was broken, what was built, what changed.');
  const cs = [
    { c:'VELAMMAL INSTITUTE OF TECHNOLOGY', h:'Online admission portal',
      p:'Every application was on paper, collected at the office and reviewed by hand — impossible to scale in peak season.',
      b:'Public application portal with document upload and validation, plus an admin panel where the team reviews, filters and updates statuses. Works as a PWA on a phone.',
      o:['First digital admission system in the institution\'s history','Paper collection and manual tracking eliminated','Applications reviewed and updated in real time'] },
    { c:'PSR PETROL PUMP', h:'Fuel station operations system',
      p:'Shift records, fuel tallies, attendance, salary and expenses lived in notebooks and spreadsheets. No single place to see the day.',
      b:'Shift management, daily sales and expenses, customer records, staff management with salary calculated from shift data, system logs and a full reports module.',
      o:['Shifts and fuel sales tracked in real time','Staff salary calculated automatically from attendance','Monthly reports in seconds instead of a day\'s work'] },
    { c:'ASIAN PEST CONTROL', h:'Field-service CRM + landing page',
      p:'Jobs assigned over WhatsApp, paper service certificates, handwritten invoices, no way to track technicians or payments.',
      b:'Lead-capture landing page plus a CRM covering customers, enquiries, quotations, work orders, invoices, payments, technician checklists, certificates and reporting.',
      o:['Paper job tracking, billing and coordination replaced','Service certificates generated and stored digitally','Live dashboard for jobs, payments and staff'] },
  ];
  const w = (12.13 - 0.44) / 3;
  cs.forEach((c, i) => {
    const x = 0.6 + i * (w + 0.22);
    s.addShape(RR, { x, y:1.62, w, h:4.56, fill:{ color:P.white }, line:{ color:P.line, width:1 }, rectRadius:0.11 });
    t(s, c.c, { x:x+0.26, y:1.86, w:w-0.52, h:0.3, fontSize:8.5, bold:true, color:P.accInk, charSpacing:0.9 });
    t(s, c.h, { x:x+0.26, y:2.18, w:w-0.52, h:0.62, fontSize:15, bold:true, color:P.ink, lineSpacingMultiple:1.04, valign:'top' });
    t(s, c.p, { x:x+0.26, y:2.84, w:w-0.52, h:0.82, fontSize:10.5, color:P.mut, lineSpacingMultiple:1.16, valign:'top' });
    t(s, c.b, { x:x+0.26, y:3.66, w:w-0.52, h:1.1, fontSize:10.5, color:P.ink7, lineSpacingMultiple:1.16, valign:'top' });
    c.o.forEach((o, j) => {
      const yy = 4.86 + j * 0.42;
      s.addShape(RR, { x:x+0.26, y:yy+0.06, w:0.11, h:0.11, fill:{ color:P.acc }, rectRadius:0.03 });
      t(s, o, { x:x+0.52, y:yy-0.02, w:w-0.78, h:0.4, fontSize:10, color:P.ink7, lineSpacingMultiple:1.1, valign:'top' });
    });
  });
  t(s, 'Also delivered: e-commerce stores with Razorpay payments, a workshop booking platform, and a rental marketplace serving customers in Russia.',
     { x:0.6, y:6.42, w:12.13, h:0.3, fontSize:10.5, color:P.mut, italic:true });
  foot(s);
}

/* ═══════════════ WHAT YOU GET / STACK ═══════════════ */
{
  const s = pres.addSlide();
  head(s, 'What you get, and what it is built on', 'The same standards on a one-page website and a full ERP.');
  const left = ['Fixed price agreed before the build starts','Clickable design approved before any code','A live link and a video update every week','Your existing data migrated in, not retyped','Staff trained on a call they can record','30 days free support, then an optional care plan','Full source code and accounts in your name','Handover documents any future developer can read'];
  s.addShape(RR, { x:0.6, y:1.62, w:6.35, h:4.56, fill:{ color:P.white }, line:{ color:P.line, width:1 }, rectRadius:0.11 });
  t(s, 'INCLUDED IN EVERY PROJECT', { x:0.92, y:1.9, w:5.7, h:0.3, fontSize:10.5, bold:true, color:P.accInk, charSpacing:1.1 });
  dots(s, left, 0.92, 2.36, 5.7, 0.46, 11.5);
  s.addShape(RR, { x:7.17, y:1.62, w:5.56, h:4.56, fill:{ color:P.ink }, rectRadius:0.11 });
  t(s, 'BUILT WITH', { x:7.49, y:1.9, w:4.9, h:0.3, fontSize:10.5, bold:true, color:P.acc, charSpacing:1.1 });
  const stack = [['Frontend','React · Next.js · Vite · Tailwind CSS'],['Backend','Node.js · TypeScript · REST APIs'],['Database','PostgreSQL · MongoDB · Supabase'],['Mobile','One codebase for Android and iOS'],['Hosting','AWS EC2 · Vercel · Nginx · daily backups'],['Payments','Razorpay · UPI · cards · payment links'],['Messaging','WhatsApp Business API · SMS · email'],['AI','Voice agents, chatbots and workflow automation']];
  stack.forEach((r, i) => {
    const y = 2.36 + i * 0.47;
    t(s, r[0], { x:7.49, y, w:1.5, h:0.32, fontSize:11, bold:true, color:P.white });
    t(s, r[1], { x:9.05, y, w:3.4, h:0.32, fontSize:11, color:P.dim });
  });
  t(s, 'Hosting, domain and payment gateway accounts are created in your name — you are never locked to me.',
     { x:0.6, y:6.42, w:12.13, h:0.3, fontSize:10.5, color:P.mut, italic:true });
  foot(s);
}

/* ═══════════════ CLOSING ═══════════════ */
{
  const s = pres.addSlide();
  s.background = { color: P.ink };
  markSmall(s, 0.6, 0.55, 0.78);
  t(s, 'BUILD FAST WEB', { x:1.52, y:0.72, w:5, h:0.45, fontSize:15, bold:true, color:P.white, charSpacing:2.4 });
  t(s, 'Tell me how your\nbusiness runs today.', { x:0.6, y:2.0, w:8.6, h:1.9, fontSize:42, bold:true, color:P.white, charSpacing:-1.2, lineSpacingMultiple:1.0 });
  t(s, 'A 30-minute call is enough for me to tell you what can be built, how long it takes and what it costs — as a fixed number, in writing.',
     { x:0.6, y:4.1, w:7.6, h:0.9, fontSize:13.5, color:P.dim, lineSpacingMultiple:1.3 });
  const contact = [['Email','hello@buildfastweb.in'],['Phone & WhatsApp','+91 97895 02278'],['Website','buildfastweb.in']];
  contact.forEach((c, i) => {
    const y = 2.05 + i * 1.12;
    s.addShape(RR, { x:8.7, y, w:4.03, h:0.94, fill:{ color:'15151B' }, rectRadius:0.09 });
    t(s, c[0], { x:8.98, y:y+0.16, w:3.5, h:0.26, fontSize:9.5, bold:true, color:P.dimD, charSpacing:0.9 });
    t(s, c[1], { x:8.98, y:y+0.45, w:3.5, h:0.34, fontSize:14, bold:true, color:P.acc });
  });
  t(s, 'Gowtham  ·  Founder, Build Fast Web  ·  Tamil Nadu, India', { x:0.6, y:6.42, w:12.13, h:0.3, fontSize:11, color:P.dimD });
  foot(s, true);
  s.addNotes('Close by asking which of the systems in the deck is closest to their business, and book the 30-minute discovery call before leaving the room.');
}

pres.writeFile({ fileName: __dirname + '/../Build-Fast-Web-Capabilities.pptx' })
  .then(f => console.log('WROTE', f, '· slides:', page));
