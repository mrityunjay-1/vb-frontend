import "./header.css";

const Header = ({ Title, children }: any) => {
    return (
        <div className="header">

            {
                Title ?
                    <h1>{Title}</h1>
                    :
                    null
            }

            {
                children
                    ?
                    <>
                        {children}
                    </>
                    : null
            }

        </div>
    );
}

export default Header;