import Simplex_form from "@/Components/Simplex_form";
export default function Calculs ({products}){
    return (
        <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Simplex Solver</h2>
          <p class="mt-2 text-center text-sm text-gray-600">Optimize profits and costs for your e-commerce clothing business.</p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Decision Variables</h3>
                <p class="mt-1 text-sm text-gray-500">Enter the products you want to optimize for.</p>
                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div class="sm:col-span-2">
                    <label for="product" class="block text-sm font-medium text-gray-700"> Product </label>
                    <div class="mt-1">
                      <input type="text" name="product" id="product" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 py-2"/>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label for="profit" class="block text-sm font-medium text-gray-700"> Profit per Unit </label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm"> $ </span>
                      </div>
                      <input type="number" name="profit" id="profit" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 py-2" placeholder="0.00" aria-describedby="profit-currency"/>
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm" id="profit-currency"> DH </span>
                      </div>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label for="cost" class="block text-sm font-medium text-gray-700"> Cost per Unit </label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm"> $ </span>
                      </div>
                      <input type="number" name="cost" id="cost" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 py-2" placeholder="0.00" aria-describedby="cost-currency"/>
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm" id="cost-currency"> DH </span>
                      </div>
                    </div>
                  </div>

                  <div class="sm:col-span-full text-right">
                    <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="add-row">
                      Add Product
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Constraints</h3>
                <p class="mt-1 text-sm text-gray-500">Enter any additional constraints like labor hours, material availability, etc.</p>
                <div class="mt-6">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <label for="constraint" class="sr-only">Constraint</label>
                        <input id="constraint" name="constraint" type="text" placeholder="e.g. Labor Hours <= 500" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2 w-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 "/>
                      </div>
                    </div>
                    <div>
                      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add Constraint
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-5">
                <div class="flex justify-end">
                  <button type="button" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="solve">
                    Solve
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div> */}
    <Simplex_form products={products}/>
      </div>
    );
}
