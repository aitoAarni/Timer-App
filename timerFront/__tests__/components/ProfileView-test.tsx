// import { render, screen, fireEvent } from '@testing-library/react-native'
// import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'
// import ProfileView from '@/components/ProfileView'
// import theme from '@/theme'
// import React from 'react'

// const mockStore = configureStore([])

// const mockUser = {
//     username: 'testuser',
//     password: 'securepassword',
//     created_at: '2024-02-28T12:00:00Z',
// }

// describe('ProfileView', () => {
//     it('renders login message when no user is logged in', () => {
//         const store = mockStore({ user: { loggedInUser: null } })
//         render(
//             <Provider store={store}>
//                 <ProfileView />
//             </Provider>
//         )
//         expect(
//             screen.getByText('You must be logged in to see user profile')
//         ).toBeTruthy()
//     })

//     it('renders profile details when a user is logged in', () => {
//         const store = mockStore({ user: { loggedInUser: mockUser } })
//         render(
//             <Provider store={store}>
//                 <ProfileView />
//             </Provider>
//         )
//         expect(screen.getByText('Profile')).toBeTruthy()
//         expect(screen.getByText('Username')).toBeTruthy()
//         expect(screen.getByText('Created at')).toBeTruthy()
//         expect(
//             screen.getByText(new Date(mockUser.created_at).toLocaleDateString())
//         ).toBeTruthy()
//     })

//     it('hides password initially and reveals it on press', () => {
//         const store = mockStore({ user: { loggedInUser: mockUser } })
//         render(
//             <Provider store={store}>
//                 <ProfileView />
//             </Provider>
//         )
//         const hiddenPassword = screen.getByText('Click to view')
//         expect(hiddenPassword).toBeTruthy()
//         fireEvent.press(hiddenPassword)
//         expect(screen.getByText(mockUser.password)).toBeTruthy()
//     })

//     it('does not toggle visibility for non-hidden fields', () => {
//         const store = mockStore({ user: { loggedInUser: mockUser } })
//         render(
//             <Provider store={store}>
//                 <ProfileView />
//             </Provider>
//         )
//         expect(screen.getByText(mockUser.username)).toBeTruthy()
//         fireEvent.press(screen.getByText(mockUser.username))
//         expect(screen.getByText(mockUser.username)).toBeTruthy()
//     })
// })
