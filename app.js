const express = require("express");
const bodyParser = require("body-parser");

const mongoose=require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
const itemsSchema={
  name:String
};
const Item=mongoose.model("Item",itemsSchema);


app.get('/', (req, res) => {
  Item.find({},function(error,founditems){
  res.render("list",{listTitle: "Today",listItems:founditems})
});
});

app.post('/',function(req,res)
{
  const newitemName=req.body.newItem;
  const item=new Item({
    name:newitemName
  });
  item.save();
  console.log("The entered value is Successfully saved!!!");

res.redirect("/");
});
app.post('/delete',function(req,res)
{
  const itemId=req.body.checkbox;
  Item.findByIdAndRemove(itemId, function(err){
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });
});

app.listen(3000, function() {
  console.log('Server Started Successfully on port 3000');
});
