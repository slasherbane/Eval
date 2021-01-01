
const stripe = new STRIPE_SDK('SECRET_KEY_FROM_STRIPE_ACCOUNT');
stripe.charges.create({
    amount: 1000 // in cents,
    currency: 'usd',
    source: 'STRIPE_TOKEN_FROM_CLIENT',
    description: 'Any description about the payment',
    metadata:{
        key: value // any meta-data you want to store
    }
}, (err, charge) => {
    if(err) {
       console.log(err);
    } else {
       console.log(charge);
    }
})