function calc(){
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    [price].forEach((item, index, arr)=>{
        let q = quantity[index];
        let total = item * q;
        document.getElementById("tot_amount").value = total;
    });
}