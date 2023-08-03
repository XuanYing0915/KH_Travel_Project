// components/OffCanvas.js

const OffCanvas = ({ data }) => {
    return (
      <div style={{ background: 'lightgray', padding: '20px', position: 'fixed', top: '0', right: '0', width: '300px', height: '100%', zIndex: '1' }}>
        {/* 在 OffCanvas 中渲染資料 */}
        <p>ID: {data.id}</p>
        <p>Name: {data.name}</p>
      </div>
    );
  };
  
  export default OffCanvas;