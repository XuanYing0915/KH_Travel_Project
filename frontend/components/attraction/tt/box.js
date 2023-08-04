const Box = ({ data, onClick }) => {
    return (
      <div
        style={{ border: '1px solid black', padding: '10px', margin: '5px', cursor: 'pointer' }}
        onClick={onClick}
      >
        {/* 顯示 id 和 name */}
        <p>ID: {data.id}</p>
        <p>Name: {data.name}</p>
      </div>
    );
  };
  
  export default Box;