import React, { useReducer, useContext, createContext, useEffect } from 'react'
import { reducer, init } from './cart-reducer'
import useLocalStorage from './use-localstorage'

const TicketCartContext = createContext(null)

export const TicketCartProvider = ({
    children,
    initialCartItems = [],
    localStorageKey = 'cart',
}) => {
    //read from localStorage
    // if localStorage has value with this key then use it to initialCartItems
    let items = initialCartItems

    if (!items.length) {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(localStorageKey)
            // Parse stored json or if none return initialValue
            items = item ? JSON.parse(item) : []
        } catch (error) {
            items = []
            console.log(error)
        }
    }

    const [state, dispatch] = useReducer(reducer, items, init)

    const [storedValue, setValue] = useLocalStorage(localStorageKey, items)

    useEffect(() => {
        if (JSON.stringify(state.items) !== storedValue) {
            setValue(state.items)
        }
    }, [state])

    const addItem = (item) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: item,
        })
    }

    const removeItem = (id) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: {
                id,
            },
        })
    }

    const updateItem = (item) => {
        dispatch({
            type: 'UPDATE_ITEM',
            payload: item,
        })
    }

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
        })
    }

    const isInCart = (id) => {
        return state.items.some((item) => item.id === id)
    }

    const plusOne = (id) => {
        return dispatch({
            type: 'PLUS_ONE',
            payload: {
                id,
            },
        })
    }
    /**
     * @param  {} id
     */
    const minusOne = (id) => {
        return dispatch({
            type: 'MINUS_ONE',
            payload: {
                id,
            },
        })
    }

    return (
        <TicketCartContext.Provider
            value={{
                cart: state,
                items: state.items,
                addItem,
                removeItem,
                updateItem,
                clearCart,
                isInCart,
                plusOne,
                minusOne,
            }}
        >
            {children}
        </TicketCartContext.Provider>
    )
}

export const useTicketCart = () => useContext(TicketCartContext)