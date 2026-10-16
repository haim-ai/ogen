/** All copy and business facts in one place. Text is the client's own, lightly tightened. */

export const WA = "https://wa.me/972537143981";
export const PHONE = { label: "02-663-50-50", href: "tel:026635050" };
export const ADDRESS = "רועי קליין 5, בית שמש";
export const HOURS = "א׳–ה׳ · 08:30–18:00";

export const EMAILS = [
  { dept: "משרד", address: "office@ngogen.co.il" },
  { dept: "פיקוח", address: "p@ngogen.co.il" },
  { dept: "מנהל משרד", address: "haim@ngogen.co.il" },
  { dept: "תפעול", address: "u@ngogen.co.il" },
  { dept: "מנכ״ל", address: "hershi@ngogen.co.il" },
];

/** a bad morning, the way it reaches the manager's phone */
export const STORM = [
  { t: "06:41", from: "אב הבית", msg: "יוסי לא הגיע היום" },
  { t: "06:47", from: "הנהלה", msg: "למה המסדרון בקומה 2 מלוכלך?" },
  { t: "06:52", from: "מטבח", msg: "חסרים שניים לצהריים" },
  { t: "06:58", from: "", msg: "3 שיחות שלא נענו" },
  { t: "07:03", from: "שומר", msg: "אין סדרן בכניסה" },
  { t: "07:05", from: "רכזת", msg: "השירותים לא נוקו מאתמול" },
  { t: "07:09", from: "עובד חדש", msg: "לאן אני אמור ללכת?" },
  { t: "07:12", from: "הנהלת חשבונות", msg: "התלושים שוב מאחרים" },
  { t: "07:14", from: "הנהלה", msg: "מתי זה מסתדר?" },
  { t: "07:16", from: "מחסן", msg: "צריך עוד ידיים לאריזה" },
  { t: "07:18", from: "", msg: "תזכורת: סיור בוקר" },
  { t: "07:21", from: "אב הבית", msg: "גם המחליף לא עונה" },
];

/** the same morning, run by Ogen's supervision */
export const CALM = [
  { t: "06:30", msg: "הערכת מצב בוצעה. כל העמדות נבדקו." },
  { t: "06:44", msg: "סדרן בכניסה הוחלף. ב. רוזן בדרך, מגיע 06:55." },
  { t: "07:00", msg: "כל העמדות מאוישות." },
  { t: "08:00", msg: "בוקר טוב. אתם פנויים לעבודה שלכם." },
];

export const SERVICES = [
  { n: "01", name: "ניקיון", line: "הצוות שלנו, הניהול שלנו, הפיקוח שלנו. אתם רק אומרים מתי ולאן להגיע." },
  { n: "02", name: "כוח אדם", line: "עובד שמתאים לעמדה, לשעות ולאופי המקום. לא מי שהיה פנוי." },
  { n: "03", name: "אחזקה", line: "צוותי אחזקה ששומרים שהמקום שלכם יהיה תקין ומתפקד." },
];

export type Post = { role: string; place: string; at: string; who: string; missing?: { at: string; sub: string } };

/** one institution's morning board. Initials only. */
export const BOARD: Post[] = [
  { role: "פיקוח", place: "סבב בוקר", at: "06:00", who: "ר. פולק" },
  { role: "ניקיון", place: "קומה 1", at: "06:00", who: "מ. כהן" },
  { role: "ניקיון", place: "קומה 2", at: "06:15", who: "ש. לוי" },
  { role: "ניקיון", place: "שירותים ומקלחות", at: "06:15", who: "א. פרידמן" },
  { role: "מטבח", place: "ארוחת בוקר", at: "06:30", who: "י. ברגר" },
  { role: "סדרן", place: "כניסה ראשית", at: "07:00", who: "", missing: { at: "06:41", sub: "ב. רוזן" } },
  { role: "אחזקה", place: "חדר דודים", at: "07:00", who: "ד. וייס" },
  { role: "אריזה", place: "מחסן", at: "07:30", who: "ח. גולד" },
  { role: "מטבח", place: "צהריים", at: "09:30", who: "נ. שטרן" },
];

export const NUMBERS = [
  { v: "2017", unit: "", label: "נותנים גב לעסקים ומוסדות, מאז" },
  { v: "2", unit: "רישיונות", label: "קבלן כוח אדם, ומתן שירותי ניקיון" },
  { v: "11", unit: "רכבים", label: "בשטח, כל יום" },
  { v: "150", unit: "לקוחות", label: "קבועים, בערך" },
  { v: "500+", unit: "עובדים", label: "בשטח. הכל מנוהל ומפוקח" },
];

export const AUDIENCE = [
  "מוסדות חינוך וישיבות",
  "מרפאות ומרכזים רפואיים",
  "מטבחים תעשייתיים ומפעלי מזון",
  "רשתות שיווק וסופרמרקטים",
  "מחסנים לוגיסטיים",
  "משרדים ומוסדות ציבור",
  "קבלני ניקיון ואחזקה",
];

export const WORKERS = [
  { label: "סדרנים", color: "#0C6F94" },
  { label: "עובדי אריזה", color: "#013F54" },
  { label: "עובדי ניקיון", color: "#1679A3" },
  { label: "עובדי מטבח", color: "#035470" },
  { label: "עובדים כלליים", color: "#236C96" },
];

export const STEPS = [
  { n: "01", title: "מכירים את המקום שלכם.", body: "מגיעים אליכם, לומדים את העמדות, השעות ואופי המקום, ומגייסים לפי זה. לא מי שפנוי, אלא מי שמתאים." },
  { n: "02", title: "העובדים מגיעים מוכנים.", body: "כל עובד מבוטח ומסודר, ומגיע ביום הראשון כשהוא כבר יודע מה מצופה ממנו." },
  { n: "03", title: "אנחנו נשארים בשטח.", body: "כל בוקר צוות הפיקוח שלנו עושה הערכת מצב. חסר עובד? מחליפים אותו מיד. והדוחות והתלושים מגיעים בזמן." },
];
