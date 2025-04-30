/* pageLayout.jsx */

function PageLayout({ title, children }) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{title}</h1>
        </div>
        <div className="page-content">
          {children}
        </div>
      </div>
    );
  }
  
  export default PageLayout;