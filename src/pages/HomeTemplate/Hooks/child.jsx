import React from 'react'
import { memo } from 'react'

function child() {
    console.log("child components rerender")
  return (
    <div>
        <h1>Child_hooks</h1>
    </div>
  );
}
export default memo(child);