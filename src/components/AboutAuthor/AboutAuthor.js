import "./AboutAuthor.css";
import Profile from "../assets/profile.jpeg";

function About() {
  return (
    <div className="about-page">
      <div className="info">
        <h4>Образование</h4>
        <p>
          <br />
          Курсове
          <br /> - завършен курс по “Javascript – Back-End” към “Software
          University”, гр. София
          <br /> - завършен курс по “Javascript – Applications” към “Software
          University”, гр. София
          <br /> - завършен курс по “Javascript – Advanced” към “Software
          University”, гр. София <br />
          <br />
          Висше образование
          <br /> - магистърска степен “Ландшафтна архитектура” към
          Лесотехнически университет, гр. София <br />
          <br />
          Средно образование
          <br /> - Природоматематическа гимназия “Нанчо Попович”, гр. Шумен
          <br />
          <br />
        </p>
        <h4>Допълнителни умения</h4>
        <p>
          <br />- Добро владеене на английски език (писмено и говоримо)
          <br /> - Основни познания свързани с “GNU/Linux” операционни системи
          <br /> - Употреба на командни инструменти като: vim за текстова
          обработка, curl за проверки и основни манипулации свързани с http
          заявки, команди за навигиране сред файлове и тяхната манипулация – cd,
          ls, cp, rm, chmod и др.
          <br />
          <br />
        </p>
        <h4>Трудов опит</h4>
        <p>
          <br />
          До този момент опитът ми е свързан с обучителните курсове по
          “Javascript”, сертификати за които прилагам към документите.
        </p>
      </div>
      <div className="contacts">
        <img src={Profile} alt="profile picture" />
        <h4>Руси Пламенов Русчев</h4>
        <h4>ruschevr@mail.bg</h4>
        <h4>089 478 2008</h4>
      </div>
    </div>
  );
}

export default About;
