import React from 'react';
import './css/main.css';

// Импортируем данные из json-файла и передаем в компонент.
import jsonData from './data/etsy.json';

const titleLength = 50;
const currencies = [
  { txt: 'USD', sign: '$' },
  { txt: 'EUR', sign: '€' },
];

function ItemTitle(str, len) {
  return str
    ? str.length > len
      ? str.slice(0, len) + ' …'
      : str
    : '-- NO TITLE --';
}

// Форматируем цену элемента в зависимости от валюты
function ItemPrice(str, curr, price) {
  let strCurr = curr.find((o) => o.txt === str);
  return strCurr
    ? `${strCurr.sign}${Number(price).toFixed(2)}`
    : `${Number(price).toFixed(2)}` + ' GBP';
}

// Определяем класс отображения количества элементов
function ItemLevel(qty) {
  return qty > 20 ? 'high' : qty > 10 ? 'medium' : 'low';
}

function Listing(props) {
  // Обрабатываем описание элемента
  const itemTitle = ItemTitle(props.title, titleLength);
  // Обрабатываем валюту элемента
  const itemPrice = ItemPrice(props.currency_code, currencies, props.price);
  // console.log(itemPrice);

  return (
    <div class="item">
      <div class="item-image">
        <a href={props.url}>
          <img src={props.MainImage && props.MainImage.url_570xN} />
        </a>
      </div>
      <div class="item-details">
        <p class="item-title">{itemTitle}</p>
        <p class="item-price">{itemPrice}</p>
        <p
          class={`item-quantity level-${
            props.quantity && ItemLevel(props.quantity)
          }`}
        >{`${props.quantity} left`}</p>
      </div>
    </div>
  );
}

export default function App() {
  // Формирование массива компонентов
  const items = jsonData.map((item) =>
    item.title && item.price ? (
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
    ) : null
  );

  return <div className="item-list">{items}</div>;
}
