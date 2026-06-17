const cl = console.log;
const productform = document.getElementById('productform')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const image = document.getElementById('image')
const rating = document.getElementById('rating')
const count = document.getElementById('Count')
const category = document.getElementById('category')
const productcontainer = document.getElementById('productcontainer')
const Addproduct = document.getElementById('Addproduct')
const Updateproduct = document.getElementById('Updateproduct')
const spinner = document.getElementById('spinner')



let productArr =[]

let Base_Url =  `https://fakestoreapi.com/products`



function snackbar(msg,icon){
    Swal.fire({
        title : msg,
        icon : icon,
        timer : 3000
    })
}
function fetchproducts(){
    spinner.classList.remove('d-none')
    let xhr = new XMLHttpRequest()

    xhr.open('GET',Base_Url)

    xhr.send(null)

    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            productArr = JSON.parse(xhr.response)
            cl(productArr)
            createnewcards(productArr.reverse())
        }

        spinner.classList.add('d-none')

    }


}

fetchproducts()


function getrating(rate){
    if(rate >= 4){
        return `badge-success`
    }else if(rate >=2){
        return ' badge-secondary'
    }else{
        return 'badge-danger'
    }
}

function createnewcards(arr){
    let result =``

    arr.forEach(ele =>{
        result +=`<div class="col-md-4 my-4" id= ${ele.id}>
					<div class="card h-100">
						<div class="card-header bg-info text-white">
							<div class="row d-flex justify-content-between align-items-center">
								<div class="col-md-8">
									<h2>${ele.title}</h2>
								</div>
								<div class="col-md-3 offset-md-1">
									<span class="badge ${getrating(ele.rating.rate)}">${ele.rating.rate}</span>
								</div>
							</div>
						</div>
						<div class="card-body p-0">
							<div class="row shadow p-3 mb-5 bg-white rounded m-0">
								<div class="col-md-10">
									<strong>${ele.description}</strong>
								</div>
							</div>
							<div class="row justify-content-between mb-3">
								<div class="col-md-8 h-100">
									<img src="${ele.image}" alt="">
								</div>
								<div class="col-md-4">
									<div class="row">
										<div class="col-md-12 text-center ">
											<strong>${ele.title}</strong>
											<strong>Price</strong>
											<div>
												<strong>$${ele.price}</strong>
											</div>
												<strong class="text-danger">Only ${ele.rating.count} left !!</strong>

											<div class="mt-3">
												<button class="btn-sm btn-primary">ADD TO CART <i class="fa-solid fa-cart-shopping  text-warning"></i></button>
											</div>
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer bg-info text-white d-flex justify-content-between align-items-center">
							<button class="btn btn-sm btn-primary" onclick="Onedit(${ele.id})">Edit</button>
							<button class="btn btn-sm btn-danger" onclick="Onremove(${ele.id})">Remove</button>

						</div>
					</div>
				</div>`
    })

    productcontainer.innerHTML = result
}

function onsubmithandl(ele){
    spinner.classList.remove('d-none')

    ele.preventDefault()

    let newProduct ={
        title : title.value,
        description : description.value,
        price : price.value,
        image : image.value,
        category : category.value,
        rating : {
            rate : rating.value,
            count : count.value
        }
    }

    

    let xhr = new XMLHttpRequest()

    xhr.open('POST',Base_Url)

    xhr.send(JSON.stringify(newProduct))

    xhr.onload = function () {
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response)

            newProduct.id = res.id
               productArr.unshift(newProduct)
            createcard(newProduct,res)

            snackbar(`The New Product with id ${res.id} is Added Successfully!!`,'success')

        }


        spinner.classList.add('d-none')

    }


}

function createcard(newProduct,res){
    let div = document.createElement('div')
    div.className = `col-md-4 my-4`
    div.id = res.id

    div.innerHTML =`<div class="card h-100">
						<div class="card-header bg-info text-white">
							<div class="row d-flex justify-content-between align-items-center">
								<div class="col-md-8">
									<h2>${newProduct.title}</h2>
								</div>
								<div class="col-md-3 offset-md-1">
									<span class="badge ${getrating(newProduct.rating.rate)}">${newProduct.rating.rate}</span>
								</div>
							</div>
						</div>
						<div class="card-body p-0">
							<div class="row shadow p-3 mb-5 bg-white rounded m-0">
								<div class="col-md-10">
									<strong>${newProduct.description}</strong>
								</div>
							</div>
							<div class="row justify-content-between mb-3">
								<div class="col-md-8 h-100">
									<img src="${newProduct.image}" alt="">
								</div>
								<div class="col-md-4">
									<div class="row">
										<div class="col-md-12 text-center ">
											<strong>${newProduct.title}</strong>
											<strong>Price</strong>
											<div>
												<strong>$${newProduct.price}</strong>
											</div>
												<strong class="text-danger">Only ${newProduct.rating.count} left !!</strong>

											<div class="mt-3">
												<button class="btn-sm btn-primary">ADD TO CART <i class="fa-solid fa-cart-shopping  text-warning"></i></button>
											</div>
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer bg-info text-white d-flex justify-content-between align-items-center">
							<button class="btn btn-sm btn-primary" onclick="Onedit(${res.id})">Edit</button>
							<button class="btn btn-sm btn-danger" onclick="Onremove(${res.id})">Remove</button>

						</div>
					</div>`


    productcontainer.prepend(div)

    productform.reset()
}


function Onedit(id){

    let editId = id

    localStorage.setItem('EditId',editId)

    let editObj = productArr.find(
        ele => String(ele.id) === String(editId)
    )

    if(!editObj){
        snackbar('Product Not Found','error')
        return
    }

    title.value = editObj.title
    category.value = editObj.category
    description.value = editObj.description
    price.value = editObj.price
    image.value = editObj.image
    rating.value = editObj.rating.rate
    count.value = editObj.rating.count

    Addproduct.classList.add('d-none')
    Updateproduct.classList.remove('d-none')
}
function onupdate(){
    spinner.classList.remove('d-none')

    let updateId = localStorage.getItem('EditId')

    let div= document.getElementById(updateId)

    let updateObj ={
        title : title.value,
        description : description.value,
        price : price.value,
        image : image.value,
        category : category.value,
        rating : {
            rate : rating.value,
            count : count.value
        },
        id : updateId
    }

    let updateUrl = `${Base_Url}/${updateId}`

    let index = productArr.findIndex(
    ele => String(ele.id) === String(updateId)
)

if(index !== -1){
    productArr[index] = updateObj
}

    let xhr = new XMLHttpRequest()
    xhr.open('PUT',updateUrl)

    xhr.send(JSON.stringify(updateObj))

    xhr.onload =function () {
        if(xhr.status >= 200 && xhr.status <= 299){
            let div= document.getElementById(updateId)

            div.innerHTML =`<div class="card h-100">
					<div class="card-header bg-info text-white">
							<div class="row d-flex justify-content-between align-items-center">
								<div class="col-md-8">
									<h2>${updateObj.title}</h2>
								</div>
								<div class="col-md-3 offset-md-1">
									<span class="badge ${getrating(updateObj.rating.rate)}">${updateObj.rating.rate}</span>
								</div>
							</div>
						</div>
						<div class="card-body p-0">
							<div class="row shadow p-3 mb-5 bg-white rounded m-0">
								<div class="col-md-10">
									<strong>${updateObj.description}</strong>
								</div>
							</div>
							<div class="row justify-content-between mb-3">
								<div class="col-md-8">
									<img src="${updateObj.image}" alt="">
								</div>
								<div class="col-md-4">
									<div class="row">
										<div class="col-md-12 text-center ">
											<strong>${updateObj.title}</strong>
											<strong>Price</strong>
											<div>
												<strong>$${updateObj.price}</strong>
											</div>
												<strong class="text-danger">Only ${updateObj.rating.count} left !!</strong>

											<div class="mt-3">
												<button class="btn-sm btn-primary">ADD TO CART <i class="fa-solid fa-cart-shopping  text-warning"></i></button>
											</div>
											
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer bg-warning d-flex justify-content-between align-items-center">
							<button class="btn btn-sm btn-primary" onclick="Onedit(${updateId})">Edit</button>
							<button class="btn btn-sm btn-danger" onclick="Onremove(${updateId})">Remove</button>

						</div>
					</div>`

            productform.reset()
            Addproduct.classList.remove('d-none')
            Updateproduct.classList.add('d-none')
            snackbar(`The  Product with id ${updateId} is Updated Successfully!!`,'success')



        }


        spinner.classList.add('d-none')

    }

}

function Onremove(id){
    spinner.classList.remove('d-none')
    let removeId = id
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed){
            
        let removeUrl = `${Base_Url}/${removeId}`

        let xhr = new XMLHttpRequest()

        xhr.open('DELETE',removeUrl)

        xhr.send(null)

        xhr.onload =function (){
            if(xhr.status >= 200 && xhr.status <= 299){
                let div = document.getElementById(removeId)

                productArr = productArr.filter(
                ele => String(ele.id) !== String(removeId)
                )
                div.remove()


                snackbar(`The  Product with id ${removeId} is Removed  Successfully!!`,'success')


            }


        spinner.classList.add('d-none')

        }
    }
    });


}


productform.addEventListener('submit',onsubmithandl)
Updateproduct.addEventListener('click',onupdate)