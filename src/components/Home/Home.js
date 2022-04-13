import { useState, useEffect } from "react";

import "./Home.css";

function Home() {
  return (
    <div className="home-board">
      <h3>Кратко описание</h3>
      <p>
        Приложението разполага с възможност за преглеждане на календарни събития
        и празници. Регистрираните потребители биха могли да създават,
        редактират и премахват собствени бележки относно отделни дни.
      </p>
    </div>
  );
}

export default Home;
