const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;
const MLapi = 'https://api.mercadolibre.com';

const searchResFormatter = (res, qty) => {
  if (res) {
    const { results, filters } = res;
    const itemsAmmount = results.slice(0, qty);
    const categories = [];
    const items = [];

    if (filters.length) {
      const category = filters.filter(fi => fi.id === 'category');
      category[0].values[0].path_from_root.map(cat => categories.push(cat.name));
    }

    itemsAmmount.map(item => {
      const formattedItem = {
        id: item.id,
        title: item.title,
        price: {
          currency: item.installments.currency_id,
          amount: item.price,
          decimals: 2
        },
        picture: item.thumbnail,
        condition: item.condition,
        freeShipping: item.shipping.free_shipping,
        location: item.address.state_name
      };

      items.push(formattedItem);
    });

    return {
      author: {
        name: 'Guillermo',
        lastname: 'Harriague'
      },
      categories,
      items
    };
  }
  return {};
}

const singleItemFormatter = (res) => {
  if (res) {
    return {
      author: {
        name: 'Guillermo',
        lastname: 'Harriague'
      },
      item: {
        id: res[0].id,
        title: res[0].title,
        price: {
          currency: res[0].currency_id,
          amount: res[0].price,
          decimals: 2
        },
        picture: res[0].pictures[0].url,
        condition: res[0].condition,
        freeShipping: res[0].shipping.free_shipping,
        soldQuantity: res[0].sold_quantity,
        description: res[1].plain_text
      }
    }
  }
  return {};
};

const getItem = (itemId) => {
  return new Promise((resolve, reject) => {
    request(`${MLapi}/items/${itemId}`, (err, response, body) => {
      if(!err) {
        const parsedItem = JSON.parse(body);
        resolve(parsedItem);
      }
      reject('failed to get item');
    });
  });
};

const getItemDesc = (itemId) => {
  return new Promise((resolve, reject) => {
    request(`${MLapi}/items/${itemId}/description`, (err, response, body) => {
      if(!err) {
        const parsedDesc = JSON.parse(body);
        resolve(parsedDesc);
      }
      reject('failed to get description');
    });
  });
};

const getItemCategories = (catId) => {};

app.get('/api/items', (req, res) => {
  const searchTerm = req.query.search;

  request(`${MLapi}/sites/MLA/search?q=${searchTerm}`, (err, response, body) => {
    if(!err) {
      const parsedRes = JSON.parse(body);
      const formattedRes = searchResFormatter(parsedRes, 4);
      res.status(200).send(JSON.stringify(formattedRes));
    }
  });
});

app.get(['/api/items/:id'], (req, res) => {
  const itemId = req.params.id;
  const itemInfo = [];
  Promise.all([getItem(itemId), getItemDesc(itemId)]).then(values => {
    values.map(val => itemInfo.push(val));
    const formattedItem = singleItemFormatter(itemInfo);
    res.status(200).send(JSON.stringify(formattedItem));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
