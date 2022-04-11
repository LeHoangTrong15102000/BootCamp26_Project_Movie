import React, { useState,  useCallback, memo } from 'react'



function Children({count , onIncrease}) {
    console.log("Children re-render")
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={onIncrease}>Increase</button>
        </div>
    )
}

// export default memo(Children)
// memo tương tự pureComponent , nó sẽ tự động kiểm tra xem props cũ và props mới có khác nhau hay không mới quyết có re-render lại component hay không 
// memo thường chỉ so sánh string, number, array, object
const ChildrenMemo = memo(Children)

function DemoUseCallback()  {
    // Cái hook này nhầm mục đích giúp cải thiện về performent\
    const [count , setCount ] = useState(0)
    const [count1, setCount1 ] = useState(0)

    // Khi component re-render sẽ tạo mới lại function này
// Nếu function này có truyền props xuống component con thì dù component con có sử dụng memo vẫn bị re-render 
    // const handleIncrease = () => {
    //     setCount(count + 1)
    // }

    // Thằng memo chỉ có tác dụng với string, boolen , number, array,  .... trường hơp pass xuống cho nó một cái function thì phải sử dụng useCallback để kết hợp

    // useCallback trả về một function
    // Khi component re-render, function chỉ được tạo mới khi giá trị trong dependencies list (array chứa các tham số) thay đổi
    // Nếu dependencies không thay đổi, nó sẽ trả về function trước đó => props của component không thay đổi => component con không bị re-render
    const handleIncrease = useCallback(() => {setCount( count + 1)}, [count]);// giá trị count thay đổi thì cái function này mới tạo ra một function mới
  return (
    <div>
        <h1>Demo useCallback</h1>
        <h3>Children</h3>
        <ChildrenMemo count={count} onIncrease={handleIncrease}/>;
        {/* tại vì cái props onIncrease là một function */}

        <h3>Main</h3>
        <p>Count1: {count1}</p>
        <button onClick={() => setCount1(count1 + 1)}>Increase</button>
    </div>
  )
}

export default DemoUseCallback