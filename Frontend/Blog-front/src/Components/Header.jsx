// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <header className="bg-[#FBEAEB] p-4 shadow-md">
//       <nav className="container mx-auto flex justify-between items-center">
      
//         <ul className="flex space-x-6">
//           <li>
//             <Link to="/" className="text-[#2F3C7E] hover:underline">Home</Link>
//           </li>
//           <li>
//             <Link to="/about" className="text-[#2F3C7E] hover:underline">About</Link>
//           </li>
//           <li>
//             <Link to="/contact" className="text-[#2F3C7E] hover:underline">Contact</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
// Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">MyApp</h1>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Blog</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">Create Blog</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
