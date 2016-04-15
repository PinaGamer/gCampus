function Alumn(name){

    return{
        setName: function(newName){
            name = newName;
        },
        getName: function(){
            return name;
        },
        displayName: function(){
            console.log(name);
        }
    }
}

var a1 = new Alumn("Carlos");
var a2 = new Alumn("Pedro");
a1.displayName();
a2.displayName();

//a2.longitudNombre();

Alumn.prototype.longitudNombre = function longitudNombre(){
     console.log(getName().length);
}

a2.longitudNombre();
