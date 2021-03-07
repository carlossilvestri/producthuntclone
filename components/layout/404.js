import React, {Fragment} from 'react';
import { css } from "@emotion/react";
const Error404 = () => {
    return ( 
        <Fragment>
            <h1 css={css`margin-top: 5rem; text-align: center;`}> Producto no Existente</h1>
        </Fragment>
     );
}
 
export default Error404;