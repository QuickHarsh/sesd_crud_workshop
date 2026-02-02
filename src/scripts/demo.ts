/**
 * usage: npx ts-node src/scripts/demo.ts
 * 
 * This script demonstrates the full CRUD lifecycle of the Product API.
 * Ensure your server is running on port 8080 before running this script.
 */

async function demo() {
    const API_URL = 'http://localhost:8080/api/products';

    console.log('🚀 Starting API Demo...\n');

    // 1. Create a Product
    console.log('1️⃣  Creating a new product...');
    const newProduct = {
        name: 'Gaming Laptop',
        description: 'High performance gaming laptop with RTX 4080',
        price: 2499.99,
        category: 'Electronics',
        stock: 50
    };

    const createRes = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    });
    const createData = await createRes.json();
    console.log('Status:', createRes.status);
    console.log('Response:', createData);

    if (!createData.success) {
        console.error('❌ Failed to create product. Exiting demo.');
        return;
    }
    const productId = createData.data._id;
    console.log('✅ Product Created! ID:', productId, '\n');

    // 2. Get All Products (with specific search)
    console.log('2️⃣  Listing products (Searching for "Gaming")...');
    const listRes = await fetch(`${API_URL}?search=Gaming`);
    const listData = await listRes.json();
    console.log('Status:', listRes.status);
    console.log(`Found ${listData.total} products.`);
    console.log('First match:', listData.products[0].name, '\n');

    // 3. Update the Product
    console.log('3️⃣  Updating the product price...');
    const updateRes = await fetch(`${API_URL}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: 2199.99 }) // Price drop!
    });
    const updateData = await updateRes.json();
    console.log('Status:', updateRes.status);
    console.log('New Price:', updateData.data.price);
    console.log('✅ Product Updated!\n');

    // 4. Delete the Product
    console.log('4️⃣  Deleting the product...');
    const deleteRes = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE'
    });
    const deleteData = await deleteRes.json();
    console.log('Status:', deleteRes.status);
    console.log('Response:', deleteData);
    console.log('✅ Product Deleted!\n');

    console.log('🎉 Demo Completed Successfully!');
}

demo().catch(console.error);
