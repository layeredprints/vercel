import Link from 'next/link';

const Menu = ({
  menuIsVisible,
  toggleMenu,
}: {
  menuIsVisible: boolean,
  toggleMenu: (e: boolean) => void,
}) => (
  <>
    <div className="h-full w-full fixed top-0 left-0 bg-black opacity-50 z-10" />
    <div className="h-full w-full fixed top-0 left-0 flex justify-center items-center z-20">
      <div className="bg-white p-8">
        <ul>
          <li>
            <button
              type="button"
              onClick={() => toggleMenu(!menuIsVisible)}
            >
              <Link href="/">
                <a href="/">
                  Home
                </a>
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </>
);

export default Menu;
