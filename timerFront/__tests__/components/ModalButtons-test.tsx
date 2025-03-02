import { render, fireEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { LoginButton, LogoutButton, ProfileButton } from '@/components/ModalButtons';
import logout from '@/utils/logout';

jest.mock('expo-router', () => ({ useRouter: jest.fn() }));
jest.mock('@/utils/logout', () => jest.fn());

describe('ModalButtons', () => {
    const mockCloseModal = jest.fn();
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    });

    test('LoginButton calls closeModal and navigates to login', () => {
        const { getByText } = render(<LoginButton closeModal={mockCloseModal} />);
        const button = getByText('Login');

        fireEvent.press(button);

        expect(mockCloseModal).toHaveBeenCalled();
        expect(mockRouterPush).toHaveBeenCalledWith('/login');
    });

    test('LogoutButton calls logout function', () => {
        const { getByText } = render(<LogoutButton />);
        const button = getByText('Logout');

        fireEvent.press(button);

        expect(logout).toHaveBeenCalled();
    });

    test('ProfileButton calls closeModal and navigates to profile', () => {
        const { getByText } = render(<ProfileButton closeModal={mockCloseModal} />);
        const button = getByText('Profile');

        fireEvent.press(button);

        expect(mockCloseModal).toHaveBeenCalled();
        expect(mockRouterPush).toHaveBeenCalledWith('/profile');
    });
});
