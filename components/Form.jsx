import Link from 'next/link'

const Form = ({
                type, postType,
                post,
                setPost,
                submitting,
                handleSubmit,
              }) => {
  return (
      <section
          className='w-full max-w-full flex-start flex-col'
      >
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{type} {postType}</span>
        </h1>
        <p className='desc text-left max-w-md'>
          {type} and share your {postType} with the world.
        </p>
        <form
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            onSubmit={handleSubmit}>
          <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your {postType}
          </span>
            <textarea
                value={post.prompt}
                onChange={(e) =>
                    setPost({ ...post, prompt: e.target.value })
                }
                placeholder='Write your prompt here...'
                required
                className='form_textarea'
            />
          </label>
          {postType && (
              <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Tag &nbsp;
              <span className='font-normal'>
                (product, webdev, idea, benchmark, etc...)
              </span>
            </span>
                <input
                    value={post.tag}
                    onChange={(e) =>
                        setPost({ ...post, tag: e.target.value })
                    }
                    placeholder='tag'
                    required
                    className='form_input'
                />
              </label>
          )}
          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href="/" className='text-gray-500-text-sm hover-brighten-nav'>
              Cancel
            </Link>
            <button
                type='submit'
                disabled={submitting}
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover-enlarge hover-brighten'
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>

      </section>
  )
}

export default Form