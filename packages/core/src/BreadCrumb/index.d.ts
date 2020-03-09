declare module '@hv/uikit-react-core/dist/BreadCrumb' {
  import React from 'react'

  class HvBreadCrumb extends React.Component<HvBreadCrumbProps, any> {}

  export default HvBreadCrumb

  export interface BreadCrumbPathElement {
    label: string
    path: string
  }

  export interface HvBreadCrumbProps extends React.HTMLAttributes<HvBreadCrumb> {
    /**
     * Class names to be applied.
     */
    className?: string

    /**
     * Id to be applied to the root node.
     */
    id?: string

    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string

      /**
       * Styles applied to the links.
       */
      link?: string

      /**
       *  Styles applied to the separator.
       */
      separator?: string
    }

    /**
     * Should use the router.
     */
    useRouter?: boolean

    /**
     * List of breadcrumb.
     */
    listRoute?: BreadCrumbPathElement[]

    /**
     * URL to build the breadcrumb.
     */
    url?: string

    /**
     * Number of pages visible.
     */
    maxVisible?: number
  }
}