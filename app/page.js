"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  CalendarCheck,
  CalendarPlus,
  Check,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  PawPrint,
  PhoneCall,
  Scissors,
  Send,
  Sparkle,
  Sparkles,
  Star,
} from "lucide-react";

const services = [
  {
    title: "精致洗护",
    category: "bath",
    image: "https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&w=900&q=80",
    alt: "小狗洗护后裹着毛巾",
    text: "双遍清洁、护毛素、耳道清洁、脚底毛修整、指甲打磨与香氛护理。",
    meta: ["60-120 分钟", "¥98 起"],
  },
  {
    title: "造型修剪",
    category: "style",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
    alt: "修剪整齐的小型犬",
    text: "圆脸、泰迪装、贵宾装、比熊轮廓和换季短剪，兼顾好看与日常打理。",
    meta: ["含基础洗护", "¥188 起"],
  },
  {
    title: "猫咪低压护理",
    category: "care",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
    alt: "猫咪被温柔抚摸",
    text: "独立猫区、低噪设备、分段休息，适合胆小猫、长毛猫和换毛期猫咪。",
    meta: ["猫犬分区", "¥168 起"],
  },
  {
    title: "皮毛 SPA",
    category: "care",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=80",
    alt: "宠物护理用品和梳毛工具",
    text: "草本舒缓、深层补水、毛结软化和皮屑护理，适合干燥、敏感和换季状态。",
    meta: ["先评估", "¥128 起"],
  },
  {
    title: "中大型犬洗护",
    category: "bath",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=900&q=80",
    alt: "开心的金毛犬",
    text: "防滑浴缸、大功率低温风干、底绒梳通与运动犬除味护理。",
    meta: ["可接送", "¥168 起"],
  },
  {
    title: "局部精修",
    category: "style",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    alt: "两只干净的狗在户外",
    text: "眼周、嘴边、脚圆、臀部和腹底毛局部处理，快速清爽不改变整体造型。",
    meta: ["30 分钟起", "¥48 起"],
  },
];

const steps = [
  ["进店评估", "记录年龄、体重、皮肤状态、毛结位置和情绪反应，确定护理方案。"],
  ["分段洗护", "清洁、按摩、冲洗和吹干之间安排短暂停顿，降低紧张感。"],
  ["可视反馈", "护理完成后提供照片、皮毛备注和家庭梳理建议。"],
  ["会员档案", "记录常用洗剂、过敏点和偏好护理师，下次到店更顺手。"],
];

const packages = [
  {
    label: "日常清爽",
    title: "基础洗护",
    text: "适合短毛、无严重毛结、定期护理的猫狗。",
    price: "¥98",
    items: ["基础洗澡吹干", "耳道与脚底清洁", "指甲修剪打磨"],
    icon: Calendar,
  },
  {
    label: "人气选择",
    title: "精致造型",
    text: "洗护加全身修剪，适合贵宾、比熊、雪纳瑞等造型犬。",
    price: "¥188",
    items: ["含基础洗护全项", "全身造型修剪", "护理后照片反馈"],
    featured: true,
    icon: Scissors,
  },
  {
    label: "舒缓养护",
    title: "皮毛 SPA",
    text: "适合换毛、干燥、皮屑、毛结和皮肤敏感阶段。",
    price: "¥128",
    items: ["皮毛状态评估", "草本舒缓护理", "家庭护理建议"],
    icon: Sparkle,
  },
];

const reviews = [
  ["林", "糯米家长", "我家比熊很怕吹风，护理师分段哄着吹，最后圆脸修得很干净，回家也没有挠皮肤。"],
  ["陈", "汤圆家长", "猫区安静很多，长毛猫底绒梳得很透，护理后还发了毛结位置和日常梳理建议。"],
  ["周", "可乐家长", "金毛洗完没有闷味，脚底毛和指甲处理得很细，接送时间也准。"],
];

const filters = [
  ["all", "全部"],
  ["bath", "洗护"],
  ["style", "造型"],
  ["care", "护理"],
];

function todayString() {
  return new Date().toISOString().split("T")[0];
}

export default function HomePage() {
  const today = useMemo(() => todayString(), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [note, setNote] = useState("");

  const visibleServices = services.filter((service) => filter === "all" || service.category === filter);

  function handleBooking(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const petName = data.get("pet") || "宝贝";
    setNote(`${petName}的预约已记录，我们会尽快电话确认具体护理时段。`);
    event.currentTarget.reset();
  }

  function jumpToBook(event) {
    event.preventDefault();
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#top" aria-label="晴爪宠物洗护首页">
            <span className="brand-mark"><PawPrint aria-hidden="true" /></span>
            <span>晴爪宠物洗护</span>
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="打开菜单"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu aria-hidden="true" />
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
            {["服务", "流程", "套餐", "联系"].map((label, index) => {
              const hrefs = ["#services", "#process", "#pricing", "#contact"];
              return (
                <a key={label} href={hrefs[index]} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              );
            })}
            <a className="btn btn-primary" href="#book" onClick={() => setMenuOpen(false)}>
              <CalendarCheck aria-hidden="true" />预约洗护
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="晴爪宠物洗护">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles aria-hidden="true" />猫狗分区 · 低压风干 · 可视化洗护</p>
              <h1>晴爪宠物洗护</h1>
              <p>为敏感皮肤、长毛犬猫和第一次进店的小家伙，准备更安静、更干净、更有耐心的洗护体验。</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#book"><CalendarPlus aria-hidden="true" />立即预约</a>
                <a className="btn btn-ghost" href="tel:18800008888"><PhoneCall aria-hidden="true" />188 0000 8888</a>
              </div>
            </div>

            <div className="quick-book" aria-label="快速预约">
              <form className="mini-form" onSubmit={jumpToBook}>
                <div className="field">
                  <label htmlFor="petType">宠物类型</label>
                  <select id="petType" name="petType" defaultValue="小型犬">
                    <option>小型犬</option>
                    <option>中大型犬</option>
                    <option>猫咪</option>
                    <option>幼宠体验</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="serviceQuick">服务项目</label>
                  <select id="serviceQuick" name="serviceQuick" defaultValue="精致洗护">
                    <option>精致洗护</option>
                    <option>造型修剪</option>
                    <option>草本 SPA</option>
                    <option>局部护理</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="dateQuick">到店日期</label>
                  <input id="dateQuick" name="dateQuick" type="date" min={today} defaultValue={today} />
                </div>
                <button className="btn btn-primary" type="submit"><Send aria-hidden="true" />提交</button>
              </form>
            </div>
          </div>
        </section>

        <section className="section alt" id="services">
          <div className="section-inner">
            <div className="section-head">
              <h2>按毛发、皮肤和情绪状态定制洗护</h2>
              <p>从基础清洁到赛级造型，护理师会先做皮毛评估，再选择适合的水温、洗剂和风干方式。</p>
            </div>

            <div className="service-tabs" role="tablist" aria-label="服务分类">
              {filters.map(([value, label]) => (
                <button
                  key={value}
                  className={`tab ${filter === value ? "active" : ""}`}
                  type="button"
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="services-grid">
              {visibleServices.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-media">
                    <img src={service.image} alt={service.alt} />
                  </div>
                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <div className="service-meta">
                      {service.meta.map((item) => (
                        <span className="chip" key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story-band" id="process">
          <div className="story">
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=82" alt="干净明亮的宠物洗护空间" />
            </div>
            <div>
              <div className="section-head">
                <h2>每一步都让宠物知道自己很安全</h2>
              </div>
              <div className="steps">
                {steps.map(([title, text], index) => (
                  <div className="step" key={title}>
                    <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-inner">
            <div className="section-head">
              <h2>常用套餐透明报价</h2>
              <p>实际价格会根据体型、毛量、毛结和攻击性风险调整，到店评估后再确认。</p>
            </div>
            <div className="price-grid">
              {packages.map((item) => {
                const Icon = item.icon;
                return (
                  <article className={`price-card ${item.featured ? "featured" : ""}`} key={item.title}>
                    <span className="badge">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="price">{item.price}<span> 起</span></div>
                    <ul className="includes">
                      {item.items.map((feature) => (
                        <li key={feature}><Check aria-hidden="true" />{feature}</li>
                      ))}
                    </ul>
                    <a className={`btn ${item.featured ? "btn-primary" : "btn-soft"}`} href="#book">
                      <Icon aria-hidden="true" />预约
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="section-inner">
            <div className="section-head">
              <h2>附近家长的真实回访</h2>
              <p>护理体验不只看成品照，也看宠物愿不愿意下一次再来。</p>
            </div>
            <div className="review-grid">
              {reviews.map(([initial, name, text]) => (
                <article className="review-card" key={name}>
                  <div className="stars" aria-label="五星评价">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star aria-hidden="true" key={index} />
                    ))}
                  </div>
                  <p>{text}</p>
                  <div className="reviewer"><span className="avatar">{initial}</span>{name}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-inner contact">
            <div className="contact-info">
              <h2>来店前先留一个时段</h2>
              <p>晴爪采用预约制，减少宠物等待和交叉压力。周末造型位建议提前 2-3 天。</p>
              <div className="contact-list">
                <ContactItem icon={MapPin} title="门店地址" text="上海市徐汇区桂林路 88 号 1F" />
                <ContactItem icon={Clock3} title="营业时间" text="周二至周日 10:00-20:00，周一店休" />
                <ContactItem icon={MessageCircle} title="预约电话" text="188 0000 8888" />
              </div>
            </div>

            <div className="contact-panel" id="book">
              <div className="section-head">
                <h2>预约洗护</h2>
              </div>
              <form className="booking-form" onSubmit={handleBooking}>
                <div className="field">
                  <label htmlFor="name">家长称呼</label>
                  <input id="name" name="name" type="text" placeholder="例如：王女士" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">联系电话</label>
                  <input id="phone" name="phone" type="tel" placeholder="188 0000 8888" required />
                </div>
                <div className="field">
                  <label htmlFor="pet">宠物昵称</label>
                  <input id="pet" name="pet" type="text" placeholder="例如：豆豆" />
                </div>
                <div className="field">
                  <label htmlFor="package">预约套餐</label>
                  <select id="package" name="package" defaultValue="基础洗护">
                    <option>基础洗护</option>
                    <option>精致造型</option>
                    <option>皮毛 SPA</option>
                    <option>猫咪低压护理</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="date">日期</label>
                  <input id="date" name="date" type="date" min={today} defaultValue={today} required />
                </div>
                <div className="field">
                  <label htmlFor="time">时间</label>
                  <select id="time" name="time" defaultValue="10:00-12:00">
                    <option>10:00-12:00</option>
                    <option>12:00-14:00</option>
                    <option>14:00-16:00</option>
                    <option>16:00-18:00</option>
                    <option>18:00-20:00</option>
                  </select>
                </div>
                <div className="field wide">
                  <label htmlFor="notes">护理备注</label>
                  <textarea id="notes" name="notes" placeholder="例如：怕吹风、皮肤敏感、毛结较多" />
                </div>
                <button className="btn btn-primary wide" type="submit"><CalendarCheck aria-hidden="true" />提交预约</button>
              </form>
              <p className="form-note" aria-live="polite">{note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© 2026 晴爪宠物洗护</span>
          <span>猫狗分区洗护 · 预约制服务 · 透明报价</span>
        </div>
      </footer>
    </>
  );
}

function ContactItem({ icon: Icon, title, text }) {
  return (
    <div className="contact-item">
      <span className="brand-mark"><Icon aria-hidden="true" /></span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}
