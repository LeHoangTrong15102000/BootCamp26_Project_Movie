import { Global, css } from '@emotion/react'


const GlobalStyles = css`
    html, body {
        font-size: 16px;
        line-height: 1.5;
        color: #333
    }

    // Viết tiếp các style toàn cục
    .container {

    }
`

// hoặc là có thể viết theo cách thứ 2
// const styles = {
//     'html, body': {
//         fontSize: '16px',
//         lineHeight: 1.5,
//         color: '#333'
//     }
// }

// export default <Global styles={GlobalStyles}/>
export default GlobalStyles