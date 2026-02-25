describe('LiveClassStore', () => {
  it('should handle student state changes', () => {
    const { result } = renderHook(() => useLiveClassStore())
    
    act(() => {
      result.current.addStudent({ id: 'student1', name: 'Test Student', isActive: true })
    })
    
    expect(result.current.students.get('student1')).toEqual(
      expect.objectContaining({ id: 'student1', name: 'Test Student' })
    )
  })
})