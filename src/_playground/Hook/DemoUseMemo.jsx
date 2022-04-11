import React, { useState, useMemo, memo } from 'react'

const Children = memo(({data}) => {
    console.log("Children re-render")
    return <div>Children - data : {data}</div>
})

const DemoUseMemo = () => {
    const [number, setNumber ] = useState(0)
    const [count , setCount ] = useState(0)

    // Hàm này luôn luôn chạy lại khi mà component re-render
    const data = () => {
        // Tưởng tượng đây là một hàm tính toán phức tạp, tốn khoảng 1 - 2s để thực thi và trả về một giá trị
        // const result = calcSomething(...)

        const result = Array.from(Array(number), (_,x) =>  x);// hàm này chỉ trả về một mảng các số tăng dần
        return result
    }

    // useMemo tập trung vào việc tránh lặp lại các tính toán logic nặng nề
    // Nếu các giá trị trong dependencies thay đổi, thì hàm tính toán sẽ được thực thi lại và trả ra giá trị mới, ngược lại nó sẽ trả ra giá trị đã tính toán trước đó mà không cần phải return lại
    const getData = useMemo(() => {// useMemo cũng giống như là useCallback giá trị trong dependencies thay đổi thì nó mới re-render lại
        // Tính toán và return về một giá trị
        
        const result = Array.from(Array(number), (_,x) =>  x);// hàm này chỉ trả về một mảng các số tăng dần
        return result
    }, [number]);// useMemo chỉ chạy lại khi mà giá trị của tham số thứ 2 thay đổi thì nó mới re-render lại
  return (
    <div>
        <h1>Demo UseMemo</h1>

        <button onClick={() => setCount( count + 1 )}>Increase Count</button>
        <input type="number" value={number} onChange={(evt) => setNumber(+evt.target.value) }/>

        {/* <p>Data phức tạp: {getData}</p> */}
        <Children data={getData}/>
    </div>
    
  )
}

export default DemoUseMemo