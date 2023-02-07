export const mockUseSwitch = (isOpen?: boolean) => {
  const switchCloseSpy = jest.fn()
  const switchOpenSpy = jest.fn()
  const switchToggleSpy = jest.fn()

  const defaultUseSwitchReturn = {
    close: switchCloseSpy,
    open: switchOpenSpy,
    toggle: switchToggleSpy,
    isOpen: isOpen || false,
  }

  const useSwitchSpy = jest.fn(() => defaultUseSwitchReturn)

  jest.doMock('common/hooks/useSwitch', () => useSwitchSpy)

  const mockSwitchOpen = (isOpen: boolean) => {
    useSwitchSpy.mockReturnValue({ ...defaultUseSwitchReturn, isOpen })
  }

  return { useSwitchSpy, switchCloseSpy, switchOpenSpy, mockSwitchOpen }
}
