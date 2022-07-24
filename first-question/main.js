
person = {
    name: 'Homer Simpson',
    gender: 'M',
    age: 48,
    height: 175
}

const persons_arr = [
    {
        name: 'Homer Simpson',
        gender: 'M',
        age: 48,
        height: 175
    },
    {
        name: 'Marge Simpson',
        gender: 'F',
        age: 35,
        height: 180
    },
    {
        name: 'Bart Simpson',
        gender: 'M',
        age: 10,
        height: 150
    },
    {
        name: 'Lisa Marie Simpson',
        gender: 'F',
        age: 8,
        height: 120
    }
]

function main(){
    //Question1:
    const woman_arr = persons_arr.filter((person)=>{
        return person.gender == 'F'
    });
    const num_of_woman = woman_arr.length;
    console.log("The number of weman: " + num_of_woman);

    //Question2:
    const  older_man_arr = persons_arr.filter((person)=>{
        return person.gender == 'M' && person.age > 40
    });
    const num_of_older_man = older_man_arr.length
    console.log("The num of men who are older than 40 is: " + num_of_older_man);

    //Question3:
    let min_age = persons_arr[0].age;
    persons_arr.forEach((person)=>{
        if(min_age > person.age){
            min_age = person.age;
        }
    })
    console.log("The youngest person is age: " + min_age);

    //Question4:
    let max_age = persons_arr[0].age;
    let oldest_person_name = persons_arr[0].name;
    persons_arr.forEach((person)=>{
        if(person.age > max_age){
            max_age = person.age;
            oldest_person_name = person.name;
        }
    });
    console.log("The Oldest person is: " + oldest_person_name + " age: " + max_age);
}

main();