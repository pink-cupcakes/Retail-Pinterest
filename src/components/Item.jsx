import React from 'react';

function Item (props) {
  return (
    <div className='listThumbnail'>
      <div className='pricePerDay'><b>${Math.max(1, props.itemDetails.rent_price_day / 100)}/</b>day</div>
      <img rel='prefetch' src={props.itemDetails.key_image} onClick={() => {props.changeView('item', props.itemDetails, props.itemNumber)}} /> <br />
    </div>
  );
}

export default Item;
