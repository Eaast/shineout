import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { paginationClass } from '../styles'
import Links from './Links'
import PageSizeList from './PageSizeList'

class Pagination extends PureComponent {
  render() {
    const { layout, size, style } = this.props
    const className = classnames(
      paginationClass('_', size),
      this.props.className,
    )

    const sectionClassName = paginationClass('section')

    return (
      <div className={className} style={style}>
        {
          layout.map((section, i) => {
            switch (section) {
              case 'links':
                return <Links key={section} {...this.props} />
              case 'list':
                return <PageSizeList key={section} {...this.props} />
              case 'jumper':
                return <div key={section} className={sectionClassName}>缺Input</div>
              default:
                if (typeof section === 'function') {
                  return (
                    <div key={i} className={sectionClassName}>
                      <span>{section(this.props)}</span>
                    </div>
                  )
                }
                return null
            }
         })
       }
      </div>
    )
  }
}

Pagination.propTypes = {
  ...getProps('size', 'type'),
  current: PropTypes.number.isRequired,
  layout: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  span: PropTypes.number,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

Pagination.defaultProps = {
  ...defaultProps,
  layout: ['links'],
  span: 5,
  text: {},
}

export default Pagination