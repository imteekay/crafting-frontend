import { createContext, useContext, useState } from 'react';

const TagInputContext = createContext();

const isObjEmpty = (object) => Object.keys(object).length === 0;

const Button = ({ tag }) => {
  const { removeTag } = useContext(TagInputContext);

  return (
    <button onClick={() => removeTag(tag)} style={{ marginLeft: '4px' }}>
      X
    </button>
  );
};

const Label = ({ children }) => <span>{children}</span>;

const Tag = ({ tag }) => (
  <span
    style={{ border: '1px solid', padding: '4px', display: 'flex', gap: '6px' }}
  >
    <Label>{tag}</Label>
    <Button tag={tag} />
  </span>
);

const Tags = () => {
  const { getTags } = useContext(TagInputContext);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {getTags().map((tag) => (
        <Tag tag={tag} />
      ))}
    </div>
  );
};

const Input = () => {
  const [newTag, setNewTag] = useState('');
  const { addTag } = useContext(TagInputContext);

  const updateTag = (event) => {
    setNewTag(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      addTag(newTag);
      setNewTag('');
    }
  };

  return <input onChange={updateTag} onKeyDown={handleEnter} value={newTag} />;
};

const Wrapper = ({ children, defaultTags }) => {
  const [tags, setTags] = useState(defaultTags);
  const isEmpty = isObjEmpty(tags);
  const hasGap = !isEmpty;

  const removeTag = (tag) => {
    const { [tag]: _, ...updatedTags } = tags;
    setTags(updatedTags);
  };

  const getTags = () => Object.values(tags);
  const hasTag = (tags, tag) => (tags[tag.toLowerCase()] ? true : false);

  const addTag = (newTag) =>
    setTags(
      hasTag(tags, newTag)
        ? tags
        : {
            ...tags,
            [newTag]: newTag,
          }
    );

  const value = {
    getTags,
    addTag,
    removeTag,
  };

  return (
    <TagInputContext.Provider value={value}>
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
    </TagInputContext.Provider>
  );
};

const TagInput = ({ defaultTags }) => (
  <Wrapper defaultTags={defaultTags}>
    <Tags />
    <Input />
  </Wrapper>
);

const defaultTags = { tag1: 'Tag 1', tag2: 'Tag 2' };

const Page = () => (
  <div style={{ margin: '16px', width: 'auto' }}>
    <TagInput defaultTags={defaultTags} />
  </div>
);

export default Page;
