import React from 'react';
import './css/main.css';

// Импортируем данные из json-файла и передаем в компонент.
import jsonData from './data/etsy.json';

function Listing(props) {
  console.log(props.MainImage);
  const MainImage = props.MainImage;
  //const url = MainImage.map((elem) => (elem.url))

  return (
    <div class="item">
      <div class="item-image">
        <a href={props.url}>
          <img src={props.MainImage} />
        </a>
      </div>
      <div class="item-details">
        <p class="item-title">{props.title}</p>
        <p class="item-price">
          {props.currency_code}
          {props.price}
        </p>
        <p class="item-quantity level-medium">{props.quantity}</p>
      </div>
    </div>
  );
}

export default function App() {
  // Формирование массива компонентов
  const items = jsonData.map((item) => (
    <Listing
      key={item.listing_id}
      listing_id={item.listing_id}
      url={item.url}
      MainImage={item.MainImage}
      title={item.title}
      currency_code={item.currency_code}
      price={item.price}
      quantity={item.quantity}
    />
  ));
  return <div class="item-list">{items}</div>;
}
