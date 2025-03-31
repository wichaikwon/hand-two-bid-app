import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2023 Your Company. All rights reserved.</p>
        <ul className="mt-2 flex justify-center space-x-4">
          <li>
            <a href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
