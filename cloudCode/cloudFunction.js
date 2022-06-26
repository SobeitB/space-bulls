Moralis.Cloud.define("Hello", async (request) => {
   const Items = Moralis.Object.extend("Rewards");
   const query = new Moralis.Query(Items);
   const objAll = await query.find();
   return objAll;
});