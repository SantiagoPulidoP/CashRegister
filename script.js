function checkCashRegister(price, cash, cid) {
    let change=cash-price;
    let moneyArray={"ONE HUNDRED":100,"TWENTY":20,"TEN":10,"FIVE":5,"ONE":1,"QUARTER":0.25,"DIME":0.1,"NICKEL":0.05,"PENNY":0.01};
    let result=[];
    let remain=0;
 
    function verify(money,base,balance){
      let num=Math.floor(money/moneyArray[base]);
      let newMoney=money;
      if(num*moneyArray[base]>=balance){
        newMoney=(money*1000-balance*1000)/1000;
        result.push([base,balance]);
      }else if(num*moneyArray[base]<balance && num!=0){
        newMoney=(money*1000-num*moneyArray[base]*1000)/1000;
        result.push([base,num*moneyArray[base]]);
        remain=(remain*1000+balance*1000-num*moneyArray[base]*1000)/1000;
      }else if(num==0){
        newMoney=money;
        remain=(remain*1000+balance*1000)/1000;
      }
      return newMoney;   
    }
 
    for(let i=8;i>=0;i--){
      change=verify(change,cid[i][0],cid[i][1]);
    }

    if(change>0){
      return {"status":"INSUFFICIENT_FUNDS","change":[]};
    }else if(change==0 && remain==0){
      return {"status":"CLOSED","change":cid};
    }else if(change==0 && remain>0){
      return {"status":"OPEN","change":result};
    }
  }