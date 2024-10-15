import CryptoJS from "crypto-js";




import img1 from '../assets/d-1.jpg'
import img2 from '../assets/d-2.jpg'
import img3 from '../assets/d-3.jpg'
import img4 from '../assets/d-4.jpg'
import img5 from '../assets/d-5.jpg'
import img6 from '../assets/d-6.jpg'
import img7 from '../assets/d-7.jpg'
import img8 from '../assets/d-8.jpg'
import img9 from '../assets/d-9.jpg'
import img10 from '../assets/d-10.jpg'
import img11 from '../assets/d-11.jpg'
import img12 from '../assets/d-12.jpg'


import brand1 from '../assets/brand-1.jpg'
import brand2 from '../assets/brand-2.jpg'
import brand3 from '../assets/brand-3.jpg'
import brand4 from '../assets/brand-4.jpg'
import brand5 from '../assets/brand-5.jpg'
import brand6 from '../assets/brand-6.jpg'
import brand7 from '../assets/brand-7.jpg'
import brand8 from '../assets/brand-8.jpg'
import brand9 from '../assets/brand-9.jpg'
import brand10 from '../assets/brand-10.jpg'
import brand11 from '../assets/brand-11.jpg'


import gallery1 from '../assets/gallery-1.jpg'
import gallery2 from '../assets/gallery-2.jpg'
import gallery3 from '../assets/gallery-3.jpg'
import gallery4 from '../assets/gallery-4.jpg'
import gallery6 from '../assets/gallery-6.jpg'




import one from '../assets/1.jpg';
import two from '../assets/2.png';
import three from '../assets/3.png';
import four from '../assets/4.png';
import five from '../assets/5.jpg';




const featureProduct = [
    {
        id:1,
        title:'Otiumhic youthul elegance anton',
        src:img1,
        category:'Shop , Fashion , Men Fashion',
        price :76.00
    },
    {
        id: 2,
        title: 'Blanca lorem reiciendis voluibus',
        src: img2,
        category: 'Shop , Electronics , Mobile & Table',
        price: 125.51
    },
    {
        id: 3,
        title: 'Deep patoni repeat predefin',
        src: img3,
        category: 'Shop , Fashion , Men Fashion',
        price: 40.00
    },
    {
        id: 4,
        title: 'Deserunt versions have evolved',
        src: img4,
        category: 'Shop , Fashion , Men Fashion',
        price: 105.00
    },
    {
        id: 5,
        title: 'Ligula tortoram labore dolore',
        src: img5,
        category: 'Shop , Fashion , Men Fashion',
        price: 99.00
    },
    {
        id: 6,
        title: 'Lorem consm asdipes dicapro',
        src: img6,
        category: 'Shop , Fashion , Men Fashion',
        price: 54.00
    },
    {
        id: 7,
        title: 'Maciti Aliqua occur thatple',
        src: img7,
        category: 'Shop , Fashion , Men Fashion',
        price: 439.00
    },
    {
        id:8,
        title:'Maiores alias conaut perfere',
        src:img8,
        category:'Shop , Fashion , Men Fashion',
        price :46.51
    },
    {
        id: 9,
        title: 'Mammo diablo except obtain',
        src: img9,
        category: 'Shop , Fashion , Men Fashion',
        price: 79.51
    },
    {
        id: 10,
        title: 'Natus therefore always bolac',
        src: img10,
        category: 'Shop , Fashion , Men Fashion',
        price: 99.00
    },
    {
        id: 11,
        title: 'Natus therefore always bolack',
        src: img11,
        category: 'Shop , Fashion , Men Fashion',
        price: 142.00
    },
    {
        id: 12,
        title: 'Omnis passage alias consola',
        src: img12,
        category: 'Shop , Fashion , Men Fashion',
        price: 66.00
    },
]


const brands =[ brand1, brand2, brand3 , brand4, brand5, brand6, brand7, brand8, brand9, brand3, brand10, brand11 ]


const gallery = [gallery1 , gallery2, gallery3, gallery4, gallery1, gallery6]

const poster = [one, two, three , four, five]

const Shop = ['Fashion', 'Sport', 'TravelVacation', 'Electronics', 'Gear']

const Fashion = ['Men Fashion', 'Women Fashion', 'Handbags', 'T-shirt', 'Western Wear']

const Sport = ['T-shirts', 'Motorcycles', 'Blouses', 'Car Lights', 'Car Accessories']

const travelVacation = ['Hotel & Resort', 'Best Tours', 'Vacation Rentanls', 'Infocus', 'Restaurants']

const Electronics = ['Mobile & Table', 'Headphone', 'USB & HDD', 'Laptop', 'Sound']

const Gear = ['Scaret', 'G25silver', 'PearJewelry', 'Hammock', 'Telescope']

const mobileTablet = ['Laptops & Tablets', 'Computer Accessories', 'Printing Services', 'Paper & Paperboard', 'Transport Package']


// Helper to check expiry
const isExpired = (expiry) => {
    const now = new Date().getTime();
    return now > expiry;
};



// Helper to decrypt user data
const decryptUserData = () => {
    const encryptedData = localStorage.getItem("userInfo");
    if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, "secret-key");
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return null;
};


// Helper to reset local storage
const resetLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userExpiry');
};

const publishable_key = `pk_test_51Q8CW5GT7AuZglI4xpdEGeQjzQ1uPcDVOHZyJWPUWllq1njYGSEbLrREzeowixZhB66YivjBzLR6sx1gXqxbBJFZ00Smketx8Z`;

const frontendURL = 'http://localhost:3000'

export { featureProduct, brands, gallery, poster, Shop, Fashion, Sport, travelVacation, Electronics, Gear, mobileTablet, resetLocalStorage, isExpired, decryptUserData, publishable_key, frontendURL }

const backendURL = `https://historebackend.onrender.com` //`http://127.0.0.1:5000` 


export default backendURL;