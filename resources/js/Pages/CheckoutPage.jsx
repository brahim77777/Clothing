import React from 'react';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {

    const cart = useSelector(state=>state.cart.value)

    console.log("cart: ",cart)
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container   mx-auto px-4">
          <form className='lg:flex gap-4 mx-4'>
        <div className="bg-white p-8 rounded-lg w-full shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Détails de facturation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Prénom *</label>
                <input type="text" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Nom *</label>
                <input type="text" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <label className="mb-2 font-semibold text-gray-700">Nom de l'entreprise (facultatif)</label>
              <input type="text" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>

            <div className="flex flex-col mt-6">
              <label className="mb-2 font-semibold text-gray-700">Pays *</label>
              <input type="text" value="Maroc" readOnly className="p-3 border rounded-md bg-gray-200 cursor-not-allowed" />
            </div>

            <div className="flex flex-col mt-6">
              <label className="mb-2 font-semibold text-gray-700">Adresse *</label>
              <input type="text" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>

            <div className="flex flex-col mt-6">
              <label className="mb-2 font-semibold text-gray-700">Ville *</label>
              <input type="text" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>

            <div className="flex flex-col mt-6">
              <label className="mb-2 font-semibold text-gray-700">CIN (رقم بطاقة التعريف الوطنية) *</label>
              <input type="text" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>

            <div className="flex flex-col mt-6">
              <label className="mb-2 font-semibold text-gray-700">Téléphone *</label>
              <input type="text" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>

            <div className="flex flex-col mt-6">
              <label className="mb-2 font-semibold text-gray-700">Adresse E-mail *</label>
              <input type="email" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>

            <div className="flex items-center mt-6">
              <input type="checkbox" id="createAccount" className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded" />
              <label htmlFor="createAccount" className="ml-2 block text-gray-700">Créer un compte ?</label>
            </div>

        </div>

        <div className="max-lg:mt-10 h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Votre commande</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>Produit</div>
                <div>Sous-total</div>
              </div>
              <div className="flex justify-between">
                <div>{cart.title}</div>
                <div>650,00 DH</div>
              </div>
              <div className="flex justify-between font-semibold">
                <div>Sous-total</div>
                <div>{cart.price * cart.qauntity}</div>
              </div>
              <div className="flex justify-between">
                <div>Expédition</div>
                <div>
                  <div>
                    <input type="radio" id="freeShipping" name="shipping" className="mr-2" defaultChecked />
                    <label htmlFor="freeShipping">Livraison gratuite</label>
                  </div>
                  <div>
                    <input type="radio" id="paidShipping" name="shipping" className="mr-2" />
                    <label htmlFor="paidShipping">Frais de transport: 49,00 DH</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <div>Total</div>
                <div>4 650,00 DH</div>
              </div>
              <div className="flex items-center mt-6">
                <input type="radio" id="paymentOnDelivery" name="payment" className="mr-2" defaultChecked />
                <label htmlFor="paymentOnDelivery">Paiement à la livraison</label>
              </div>
              <button className="w-full mt-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Commander</button>
            </div>
          </div>
        </div>
          </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
