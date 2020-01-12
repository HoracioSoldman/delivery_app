let ApiStore = (function(){ 
    let instance;
    const init = ()=>{
        //private methods & variables
        const availableStatus = ['WAITING', 'ASSIGNED', 'PICKED_UP', 'DELIVERED'];
        const users = generateUsers();
        let bikers = users.filter(usr=>(usr.role === 'Biker'));
        bikers.map(bk => ({id: bk.id, username: bk.username, role: bk.role}))
        let shipments = [];
        

        function generateUsers (){
            let users = [];
            for(let i = 0; i < 10; i++){
                users.push({
                    id: `userID_${i}`,
                    username: `Biker_${i}`,
                    password: `biker_${i}`,
                    role: 'Biker'
                })
            }
            users.push({
                id: 'userID_10',
                username: `Manager`,
                password: `manager`,
                role: 'Manager'
            })
        
            return users;
        }

        function generateShipments(){
            for (let i = 0; i < 50; i++){
                
                let status = generateStatus();
                let assignment = generateAssignment(status);
                
                let newShipment = {
                    id: `shpID_${i}`,
                    origin: `origin_address_shp${i}`,
                    destination: `destination_address_shp${i}`,
                    assignee: assignment.assignee,
                    pickup: assignment.pickup,
                    delivery: assignment.delivery,
                    status: status
                };
                shipments.push(newShipment);
            }
            return shipments;
        }

        function updateAShipment(shipment, req) {
        
            shipments = shipments.map(shp=>{
                if(shp.id === shipment.id){
                    return shipment;
                }
                return shp;
            })

            var io = req.app.get('io');
            io.emit('updated', {msg: `Shipment ${shipment.id} updated !`, shps: getShipments(), updated: shipment});
            return shipments; 
        } 

        //Methods used to generate lots of random elements of our mock data
        function generateStatus (){
            return availableStatus[getRandomNbr(0, 3)];
        
        }

        function generateAssignment (status){
            
            let assignment = { 
                assignee: null,
                pickup: null,
                delivery: null
            }

            if(status !== availableStatus[0]){
                assignment.assignee = getRandomBiker();
            }

            if(status === availableStatus[2] || status === availableStatus[3]){
                let date0 = new Date();
                //The pick up time should be between 8 to 16 o'clock
                date0.setHours(getRandomNbr(8, 16), getRandomNbr(0, 59))
                assignment.pickup = date0;

                if(status === availableStatus[3]){
                    //Assuming that the shipment time is between 1 to 4 hours
                    let date1 = new Date(
                        `${date0.getFullYear()}-${date0.getMonth()+1}-${date0.getDate()} 
                        ${date0.getHours()+getRandomNbr(1, 4)}:${getRandomNbr(0, 59)}`
                        );
    
                    assignment.delivery = date1;
                    
                }
            }
            


            return assignment;
        }

        function getRandomNbr(min, max){
            return Math.floor(Math.random() * (max -min+1))+min
        }

        function getRandomBiker(){
            return users[getRandomNbr(0, bikers.length-1)]
        }

        function getShipments(filter){
            
            let shps = shipments.length === 0 ? generateShipments() : shipments;
            
            return filter !== null ? 
            shps.filter(shp=>(
                shp.status !== availableStatus[0] && shp.assignee.id === filter
            )) :
            shps;

        }

        function getBikers(){
            return bikers;
        }

      
        function authenticate(username, password){
            
            let result = {
                status: 'FAILURE',
                msg: 'Invalid Username.',
                user: {},
                token: null
            }

            for(let i= 0; i < users.length; i++){
                let usr = users[i];
                if(usr.username === username){
                    if(usr.password === password){
                        result.status = 'SUCCESS';
                        result.msg = 'User authenticated successfully.'
                        result.user = {
                            id: usr.id,
                            uname: usr.username,
                            role: usr.role
                        };
                         
                    }else 
                        result.msg = 'Invalid Password.' 
                    
                    break;
                }
            }
            
            return result;
        }

        function verifyUserById(id){
            let result = {
                status: 'FAILURE',
                msg: 'Invalid Username.',
                user: {},
                token: null
            }
            for(let i= 0; i < users.length; i++){
                let usr = users[i];
                if(usr.id === id){
                    
                    result.status = 'SUCCESS';
                    result.msg = 'User does exist.'
                    result.user = {
                        id: usr.id,
                        uname: usr.username,
                        role: usr.role
                    };
                    
                    break;
                }
            }
            
            return result

        }

        return {
            //public methods & variables 
            allUsers: users,
            allBikers: getBikers,
            allShipments: getShipments,
            updateShipment: updateAShipment,
            authenticate: authenticate,
            verifyUser: verifyUserById
        }

    }

    return {
        getInstance : () =>{ //Use of Singleton pattern, preventing multiple instances creation for our ApiStore
            instance = !instance ? init() : instance
            return instance;
        }
            
    }
})();

module.exports = ApiStore;