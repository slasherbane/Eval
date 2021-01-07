import Stripe from 'stripe';
var express = require ('express');
const stripe1 = require('stripe');
const stripe = stripe1('sk_test_51I4PzpAZwGxhoksAyHbLLtUXS7Cvj9dBhC7mgDjnuSvSB68L1JGCl7GKn7ymJLXLmbMtdS9cWTejk4ACpYQx7xie00ZzZxCyyh');
 
const app = express();

app.listen(3000, function() {
        console.log("server runnng");

});

const createCustomer = async () => {
    const params: Stripe.CustomerCreateParams = {
      email: 'mike@gmail.com',
      name: "Mike",
      description: "from node"
    };

  
    const customer: Stripe.Customer = await stripe.customers.create(params);
  
    console.log(customer.id);
}
// createCustomer();


//récuperation des données



// const stRipe = require('stripe')('sk_test_51I4PzpAZwGxhoksAyHbLLtUXS7Cvj9dBhC7mgDjnuSvSB68L1JGCl7GKn7ymJLXLmbMtdS9cWTejk4ACpYQx7xie00ZzZxCyyh');

// const customer =  stRipe.customers.retrieve(
//   'cus_IiBJW75mCFHEln'
  
// );


// la supression des données

// const sTripe = require('stripe')('sk_test_51I4PzpAZwGxhoksAyHbLLtUXS7Cvj9dBhC7mgDjnuSvSB68L1JGCl7GKn7ymJLXLmbMtdS9cWTejk4ACpYQx7xie00ZzZxCyyh');

// const deleted =  sTripe.customers.del(
//   'cus_IiC4LbIk7uH95u'
// );
// const stripe3 = require('stripe')('sk_test_51I4PzpAZwGxhoksAyHbLLtUXS7Cvj9dBhC7mgDjnuSvSB68L1JGCl7GKn7ymJLXLmbMtdS9cWTejk4ACpYQx7xie00ZzZxCyyh');

// const product =  stripe3.products.create({
//   name: 'Gold Special',
// });

const stribe = require('stripe');
const sripe = stribe('sk_test_51I4PzpAZwGxhoksAyHbLLtUXS7Cvj9dBhC7mgDjnuSvSB68L1JGCl7GKn7ymJLXLmbMtdS9cWTejk4ACpYQx7xie00ZzZxCyyh');

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
var token = request.body.stripeToken; // Using Express

sripe.orders.pay('or_1I6m17AZwGxhoksAkTNftdE1', {
  source: token,
})