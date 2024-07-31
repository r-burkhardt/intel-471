import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array of objects by field in ascending order', () => {
    const array = [{ name: 'John' }, { name: 'Jane' }, { name: 'Doe' }];
    const sortedArray = pipe.transform(array, 'asc', 'name');
    expect(sortedArray).toEqual([{ name: 'Doe' }, { name: 'Jane' }, { name: 'John' }]);
  });

  it('should sort array of objects by field in descending order', () => {
    const array = [{ name: 'John' }, { name: 'Jane' }, { name: 'Doe' }];
    const sortedArray = pipe.transform(array, 'desc', 'name');
    expect(sortedArray).toEqual([{ name: 'John' }, { name: 'Jane' }, { name: 'Doe' }]);
  });

  it('should sort array of primitive values in ascending order', () => {
    const array = [3, 1, 2];
    const sortedArray = pipe.transform(array, 'asc');
    expect(sortedArray).toEqual([1, 2, 3]);
  });

  it('should sort array of primitive values in descending order', () => {
    const array = [3, 1, 2];
    const sortedArray = pipe.transform(array, 'desc');
    expect(sortedArray).toEqual([3, 2, 1]);
  });
});
