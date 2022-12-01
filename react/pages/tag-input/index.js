import { useState } from 'react';

const removeTag = (tags, tag) => {
  const { [tag]: _, ...updatedTags } = tags;
  return updatedTags;
};

const getTags = (tags) => Object.values(tags);
const hasTag = (tags, tag) => (tags[tag.toLowerCase()] ? true : false);
const isObjEmpty = (object) => Object.keys(object).length === 0;

const Wrapper = ({ children, hasGap }) => (
  <div
    style={{
      padding: '4px',
      border: '1px solid',
      display: 'flex',
      gap: hasGap ? '4px' : 'initial',
      width: 'fit-content',
    }}
  >
    {children}
  </div>
);

const Button = ({ tag, setTags }) => (
  <button
    onClick={() => setTags((tags) => removeTag(tags, tag))}
    style={{ marginLeft: '4px' }}
  >
    X
  </button>
);

const Label = ({ children }) => <span>{children}</span>;

const Tag = ({ tag, setTags }) => (
  <span
    style={{ border: '1px solid', padding: '4px', display: 'flex', gap: '6px' }}
  >
    <Label>{tag}</Label>
    <Button tag={tag} setTags={setTags} />
  </span>
);

const Tags = ({ tags, setTags }) => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {getTags(tags).map((tag) => (
      <Tag tag={tag} setTags={setTags} />
    ))}
  </div>
);

const Input = ({ setTags }) => {
  const [newTag, setNewTag] = useState('');

  const updateTag = (event) => {
    setNewTag(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      setTags((tags) =>
        hasTag(tags, newTag)
          ? tags
          : {
              ...tags,
              [newTag]: newTag,
            }
      );

      setNewTag('');
    }
  };

  return <input onChange={updateTag} onKeyDown={handleEnter} value={newTag} />;
};

const TagInput = ({ defaultTags }) => {
  const [tags, setTags] = useState(defaultTags);
  const isEmpty = isObjEmpty(tags);
  const hasGap = !isEmpty;

  return (
    <Wrapper hasGap={hasGap}>
      <Tags tags={tags} setTags={setTags} />
      <Input setTags={setTags} />
    </Wrapper>
  );
};

const defaultTags = { tag1: 'Tag 1', tag2: 'Tag 2' };

const Page = () => (
  <div style={{ margin: '16px', width: 'auto' }}>
    <TagInput defaultTags={defaultTags} />
  </div>
);

export default Page;
