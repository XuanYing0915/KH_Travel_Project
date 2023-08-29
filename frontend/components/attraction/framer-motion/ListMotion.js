import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import React from 'react'

// show - 呈現動畫
// hide - 隱藏動畫
// exit - 移除動畫(只有 項目 用)
export const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.2, //控制每個子項目的開始動作時間
      delayChildren: 0.05, //控制整個子項目的開始動作時間
    },
  },
  hide: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const itemVariants = {
  hide: { opacity: 0, transition: { duration: 0.5 } },
  show: { opacity: 1, transition: { duration: 0.5 } },
  // 移除時動畫
  exit: {
    opacity: 0, // 不透明度 0
    x: 50, // 向右位移50
    transition: {
      ease: 'easeOut',
      duration: 0.3, //撥放0.3s
    },
  },
}

export function ListMotionContainer({
  element = 'div',
  visible = true, // control all items show
  children,
  ...otherProps
}) {
  const myComponent = (element) => {
    switch (element) {
      case 'ul':
        return motion.ul
      case 'p':
        return motion.p
      case 'section':
        return motion.section
      case 'span':
        return motion.span
      case 'tbody':
        return motion.tbody
      case 'tr':
        return motion.tr
      case 'td':
        return motion.td
      case 'table':
        return motion.table
      case 'div':
      default:
        return motion.div
    }
  }

  const myProps = {
    ...otherProps,
    variants: containerVariants,
    initial: 'hide',
    animate: visible ? 'show' : 'hide',
  }

  // return react element shape:
  /* <LayoutGroup>
      <motion.div>
        <AnimatePresence>
          {children}
        </AnimatePresence>
      </motion.div>
      </LayoutGroup> */

  return React.createElement(
    LayoutGroup,
    null,
    React.createElement(
      myComponent(element),
      myProps,
      React.createElement(AnimatePresence, null, children)
    )
  )
}

// item elements: h1, h2, div, span,  li(use with ul), a, img, p...
// if need others, just add switch case and return motion.XXX
export function ListMotionItem({
  element = 'div',
  noShift = false,
  children,
  ...otherProps
}) {
  const myComponent = (element) => {
    switch (element) {
      case 'span':
        return motion.span
      case 'li':
        return motion.li
      case 'img':
        return motion.img
      case 'p':
        return motion.p
      case 'a':
        return motion.a
      case 'h1':
        return motion.h1
      case 'h2':
        return motion.h2
      case 'tr':
        return motion.tr
      case 'td':
        return motion.td
      case 'div':
      default:
        return motion.div
    }
  }

  const myProps = {
    ...otherProps,
    variants: itemVariants,
    exit: noShift ? { ...itemVariants.exit, x: 0 } : itemVariants.exit,
    layout: 'position',
  }

  return React.createElement(myComponent(element), myProps, children)
}
