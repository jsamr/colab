import React, { PropTypes } from 'react'

const CategoryId = ({ id }) => (
  <span class="id-span  fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x circle-id" />
            <i className="fa fa-inverse fa-stack-1x text-id">{id}</i>
        </span>
)

CategoryId.propTypes = {
  id: PropTypes.number.isRequired
}

export default CategoryId