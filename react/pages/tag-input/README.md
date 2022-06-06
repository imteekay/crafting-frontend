# Tag Input

Design, implement and style a Tag input component.

The user types in an input field and on “Enter” a tag of whatever they typed is created.

## Requirements:

- the tags must be removable
- the input cannot accept duplicate values (case insensitive)
- The CSS must match the design they gave

## Bonus:

- Add an Autocomplete feature with the provided JSON list.

## Implementation

### UI

![tag-input](/images/tag-input.png)

- `TagInput`: the main component
- `Input`: the input tag
- `Tags`: the component to hold the list of tags
- `Tag`: the tag component
- `Button`: the close button
- `Wrapper`: the tag input wrapper component

## Behavior

- Close button: remove the tag from the list of tags
- Enter: add the tag to the list of tags
- Tags items: the state of tags

## Data model

```
{
  'test1': 'Test1',
  'test2': 'Test2',
  'test3': 'Test3',
}
```

With a hashmap:

- `O(1)` to add a new tag
- `O(1)` to remove a tag

## Event handler

- `onClick`: for close button
- `onChange`: for input state
- `onKeyDown`: for the enter keyword
