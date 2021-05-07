import express from 'express';
import {read} from './jsonFileStorage.js';

const app = express();

function sendIndexRecipe(req,res){
  const index = req.params.index;
  read('data.json', (err,jsonObj)=>{
    if(err){
      return err;
    }
    res.send(jsonObj.recipes[index]);
  });  
}

function sendPortionRecipe(req,res){
  const portion = req.params.portion;
  read('data.json',(err,jsonObj)=>{
    if(err){
      return err;
    }
    let recipeList = jsonObj.recipes;
    const portionRecipeArr =[];
    for(let i=0; i<recipeList.length; i+=1){
      console.log(portion);
      // console.log(recipeList[i])
      if(recipeList[i].yield==portion){
        portionRecipeArr.push(recipeList[i]);
      }
    }
    res.send(portionRecipeArr);
  })
}

function handleLableRecipe(req, res){
  const label = req.params.label;
  read('data.json',(err,jsonObj)=>{
    if(err){
      return err;
    }
    let recipeList = jsonObj.recipes;
    const portionRecipeArr =[];
    for(let i=0; i<recipeList.length; i+=1){
      if(recipeList[i].label.replace(/\s+/g, '-').toLowerCase()==(label) || (recipeList[i].label == label)){
        portionRecipeArr.push(recipeList[i]);
      }
    }
    res.send(portionRecipeArr);
  })

}

app.get('/recipe/:index', sendIndexRecipe);

app.get('/yield/:portion', sendPortionRecipe);

app.get('/recipe-label/:label', handleLableRecipe);

app.use(function (req, res, next) {
  res.status(404).send("Sorry we can't find that!")
});

app.listen(3004);
